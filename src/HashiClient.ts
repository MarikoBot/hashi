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
  readonly #src: Client;

  /**
   * The logger for the HashiClient.
   */
  readonly #logger: Logger;

  /**
   * The command manager instance.
   */
  readonly #commandManager: CommandManager = new CommandManager(this);

  /**
   * The event manager instance.
   */
  readonly #eventManager: EventManager = new EventManager(this);

  /**
   * The language manager for accessing strings.
   */
  readonly #languageManager: LanguageManager = new LanguageManager(this);

  /**
   * The database manager for accessing data maps/lakes.
   */
  readonly #databaseManager: DatabaseManager = new DatabaseManager(this);

  /**
   * The services manager for accessing different services (automatic roles, etc).
   */
  readonly #serviceManager: ServiceManager = new ServiceManager(this);

  /**
   * The language manager for accessing strings.
   */
  readonly #constants: Constants = new Constants();

  /**
   * The name of the project/process you're in.
   */
  readonly #processName: string;

  /**
   * The commands folder directory.
   */
  readonly #commandsDir: string = 'commands';

  /**
   * The events folder directory.
   */
  readonly #eventsDir: string = 'events';

  /**
   * Get the Discord Client instance.
   * @returns The Discord Client instance.
   */
  get src(): Client {
    return this.#src;
  }

  /**
   * Get the logger for the HashiClient.
   * @returns The logger for the HashiClient.
   */
  get logger(): Logger {
    return this.#logger;
  }

  /**
   * Get the command manager instance.
   * @returns The command manager instance.
   */
  get commandManager(): CommandManager {
    return this.#commandManager;
  }

  /**
   * Get the event manager instance.
   * @returns The event manager instance.
   */
  get eventManager(): EventManager {
    return this.#eventManager;
  }

  /**
   * Get the language manager for accessing strings.
   * @returns The language manager for accessing strings.
   */
  get languageManager(): LanguageManager {
    return this.#languageManager;
  }

  /**
   * Get the database manager for accessing data maps/lakes.
   * @returns The database manager for accessing data maps/lakes.
   */
  get databaseManager(): DatabaseManager {
    return this.#databaseManager;
  }

  /**
   * Get the services manager for accessing different services (automatic roles, etc).
   * @returns The services manager for accessing different services (automatic roles, etc).
   */
  get serviceManager(): ServiceManager {
    return this.#serviceManager;
  }

  /**
   * Get the constants.
   * @returns The constants.
   */
  get constants(): Constants {
    return this.#constants;
  }

  /**
   * Get the name of the project/process you're in.
   * @returns The name of the project/process you're in.
   */
  get processName(): string {
    return this.#processName;
  }

  /**
   * Get the commands folder directory.
   * @returns The commands folder directory.
   */
  get commandsDir(): string {
    return this.#commandsDir;
  }

  /**
   * Get the events folder directory.
   * @returns The events folder directory.
   */
  get eventsDir(): string {
    return this.#eventsDir;
  }

  /**
   * The constructor for the HashiClient class.
   * @param options The options for the HashiClient.
   */
  constructor(options: HashiClientOptions) {
    this.#src = new Client({
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

    this.#processName = options.processName || '`Who I am ?`';
    this.#logger = new Logger(this.processName);
    this.#commandsDir = options.commandsDir;
    this.#eventsDir = options.eventsDir;
  }

  /**
   * Login the client to Discord.
   * @param token The token of the bot.
   * @returns Nothing.
   */
  public async login(token: string = process.env.TOKEN || process.env.token || process.env.Token): Promise<string> {
    await this.eventManager.loadEvents();

    await this.src.login(token);
    await this.commandManager.loadCommands();

    let i: number = -1;
    let dataMap: DataMap<TypedDataMapStored>;
    while (++i < Object.keys(this.databaseManager.dataMaps).length) {
      dataMap = Object.values(this.databaseManager.dataMaps)[i];
      if (dataMap.intents.includes(DATAMAP_INTENTS.CORE)) await dataMap.refreshCore();
    }

    this.logger.info(`The client is successfully launched on Discord as ${this.src.user.tag}`);

    return '0';
  }

  /**
   * Function that encapsulates the command detection, authorization and execution.
   * @param interaction The associated interaction.
   * @returns The issue of the command.
   */
  public async detectAndLaunchCommand(interaction: ChatInputCommandInteraction): Promise<COMMAND_END> {
    const commandBlock: CommandBlock = this.commandManager.getCommand(interaction);
    if (commandBlock.command) return HashiSlashCommand.launch(this, interaction, commandBlock);
    return COMMAND_END.SUCCESS;
  }
}
