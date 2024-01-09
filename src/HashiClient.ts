// noinspection JSUnusedGlobalSymbols

import { ActivityType, ChatInputCommandInteraction, Client, ClientOptions, PresenceData } from 'discord.js';
import { Logger } from './Logger';
import * as dotenv from 'dotenv';
import { CommandBlock, CommandManager } from './CommandManager';
import { EventManager } from './EventManager';
import { LanguageManager } from './LanguageManager';
import { Constants } from './Constants';
import { COMMAND_END } from './HashiSlashBaseCommand';
import { HashiSlashCommand } from './HashiSlashCommand';
import { DatabaseManager } from './DatabaseManager';
import { ServiceManager } from './ServiceManager';
import { DATAMAP_INTENTS, DataMap, TypedDataMapStored } from './DataMap';

dotenv.config();

/**
 * The options for the HashiClient. It extends the ClientOptions from discord.js and implements extra options for the Hashi module.
 */
export interface HashiClientOptions extends ClientOptions {
  /**
   * The name of the project/process you're in.
   */
  processName: string;
  /**
   * The commands folder directory. How to export your commands?
   * @example
   * // If the events directory has been set to "commands":
   * // File ./commands/ping.ts
   * import {HashiSlashCommand} from '@elouannh/hashi';
   *
   * const command: HashiSlashCommand = new HashiSlashCommand('ping')
   *   .setDescription('Replies "pong"!')
   *   .callbackFunction(async (client, interaction, context) => context.reply('pong'));
   *
   * export default command;
   */
  commandsDir: string;
  /**
   * The events folder directory. How to export your events?
   * @example
   * // If the events directory has been set to "events":
   * // File ./events/ready.ts
   * import {Event} from '@elouannh/hashi';
   *
   * const event: Event = new Event('ready')
   *   .callbackFunction(async (client) => console.log('client is ready!'));
   *
   * export default event;
   */
  eventsDir: string;
}

/**
 * The HashiClient class. It extends the Client class from discord.js and implements extra methods for the Hashi module.
 */
export class HashiClient {
  /**
   * The Discord Client instance.
   */
  public readonly src: Client;

  /**
   * The logger for the HashiClient.
   */
  public readonly Logger: Logger;

  /**
   * The command manager instance.
   */
  public readonly CommandManager: CommandManager = new CommandManager(this);

  /**
   * The event manager instance.
   */
  public readonly EventManager: EventManager = new EventManager(this);

  /**
   * The language manager for accessing strings.
   */
  public readonly LanguageManager: LanguageManager = new LanguageManager(this);

  /**
   * The database manager for accessing data maps/lakes.
   */
  public readonly DatabaseManager: DatabaseManager = new DatabaseManager(this);

  /**
   * The services manager for accessing different services (automatic roles, etc).
   */
  public readonly ServiceManager: ServiceManager = new ServiceManager(this);

  /**
   * The language manager for accessing strings.
   */
  public readonly Constants: Constants = new Constants();

  /**
   * The name of the project/process you're in.
   */
  public readonly processName: string;

  /**
   * The commands folder directory. How to export your commands?
   * @example
   * // If the events directory has been set to "commands":
   * // File ./commands/ping.ts
   * import {HashiSlashCommand} from '@elouannh/hashi';
   *
   * const command: HashiSlashCommand = new HashiSlashCommand('ping')
   *   .setDescription('Replies "pong"!')
   *   .callbackFunction(async (client, interaction, context) => context.reply('pong'));
   *
   * export default command;
   */
  public readonly commandsDir: string = 'commands';

  /**
   * The events folder directory. How to export your events?
   * @example
   * // If the events directory has been set to "events":
   * // File ./events/ready.ts
   * import {Event} from '@elouannh/hashi';
   *
   * const event: Event = new Event('ready')
   *   .callbackFunction(async (client) => console.log('client is ready!'));
   *
   * export default event;
   */
  public readonly eventsDir: string = 'events';

  /**
   * The constructor for the HashiClient class.
   * @param options The options for the HashiClient.
   */
  constructor(options: HashiClientOptions) {
    this.src = new Client({
      intents: options.intents || 3276799,
      failIfNotExists: options.failIfNotExists || false,
      presence:
        options.presence ||
        <PresenceData>{
          status: 'online',
          activities: [
            {
              name: `with version ${require('../package.json').version}`,
              type: ActivityType['Playing'],
            },
          ],
        },
    });

    this.processName = options.processName || '`Who I am ?`';
    this.Logger = new Logger(this.processName);
    this.commandsDir = options.commandsDir;
    this.eventsDir = options.eventsDir;
  }

  /**
   * Login the client to Discord.
   * @param token The token of the bot.
   * @returns Nothing.
   */
  public async login(token: string = process.env.TOKEN || process.env.token || process.env.Token): Promise<string> {
    await this.EventManager.loadEvents();

    await this.src.login(token);
    await this.CommandManager.loadCommands();

    let i: number = -1;
    let dataMap: DataMap<TypedDataMapStored>;
    while (++i < Object.keys(this.DatabaseManager.dataMaps).length) {
      dataMap = Object.values(this.DatabaseManager.dataMaps)[i];
      if (dataMap.intents.includes(DATAMAP_INTENTS.CORE)) await dataMap.refreshCore();
    }

    this.Logger.info(`The client is successfully launched on Discord as ${this.src.user.tag}`);

    return '0';
  }

  /**
   * Function that encapsulates the command detection, authorization and execution.
   * @param interaction The associated interaction.
   * @returns The issue of the command.
   */
  public async detectAndLaunchCommand(interaction: ChatInputCommandInteraction): Promise<COMMAND_END> {
    const commandBlock: CommandBlock = this.CommandManager.getCommand(interaction);
    if (commandBlock.command) return HashiSlashCommand.launch(this, interaction, commandBlock);
    return COMMAND_END.SUCCESS;
  }
}
