import {
  ActivityType,
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  Client,
  PresenceData,
} from 'discord.js';
import * as dotenv from 'dotenv';
import {
  HashiCommandManager,
  DatabaseManager,
  DataMap,
  DATAMAP_INTENTS,
  HashiEventManager,
  LanguageManager,
  Logger,
  TypedDataMapStored,
} from '../base/';
import { Validators, InstanceValidator, InstanceValidatorReturner } from '../decorators';
import {
  CommandGroup,
  HashiClientOptions,
  COMMAND_END,
  FileManager,
  HashiSlashCommand,
  HashiClientChannelsOption,
} from './';

dotenv.config();

/**
 * The HashiClient class. It extends the Client class from discord.js and implements extra methods for the Hashi module.
 */
export class HashiClient {
  /**
   * The Discord Client instance.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(Client))
  public readonly src: Client;

  /**
   * The logger for the HashiClient.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(Logger))
  public readonly logger: Logger;

  /**
   * The command manager instance.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(HashiCommandManager))
  public readonly commandManager: HashiCommandManager = new HashiCommandManager(this);

  /**
   * The event manager instance.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(HashiEventManager))
  public readonly eventManager: HashiEventManager = new HashiEventManager(this);

  /**
   * The language manager for accessing strings.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(LanguageManager))
  public readonly languageManager: LanguageManager = new LanguageManager(this);

  /**
   * The database manager for accessing data maps/lakes.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(DatabaseManager))
  public readonly databaseManager: DatabaseManager = new DatabaseManager(this);

  /**
   * The files manager for accessing different files (for handling especially).
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(FileManager))
  public readonly fileManager: FileManager = new FileManager(this);

  /**
   * The name of the project/process you're in.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidId)
  public readonly projectName: string;

  /**
   * The Discord channels where the bot can be configured/logged.
   */
  @(<InstanceValidator>Validators.ObjectValidator.KeyStringPair)
  public readonly configChannels: Partial<HashiClientChannelsOption>;

  /**
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
              name: `with version ${require('../../package.json').version}`,
              type: ActivityType.Playing,
            },
          ],
        },
    });

    this.projectName = options.projectName || '`unknown`';
    this.logger = new Logger(this.projectName, this);

    this.databaseManager.dbName = options.mongoose.dbName || 'main';
    this.databaseManager.connectOptions = options.mongoose.connectOptions || { dbName: this.databaseManager.dbName };
    if (options.mongoose.connectionURI) this.databaseManager.connectionURI = options.mongoose.connectionURI;

    this.configChannels = options.configChannels || {};

    process.on('unhandledRejection', (reason: object & { stack: any }) => this.logger.error(reason?.stack || reason));
    process.on('uncaughtException', (err: Error, origin: NodeJS.UncaughtExceptionOrigin): void => {
      this.logger.error(err);
      this.logger.error(origin);
    });
  }

  /**
   * Connect the database.
   * @returns Nothing.
   */
  public async connectDatabase(): Promise<void> {
    this.logger.info('Database is connecting...');
    await this.databaseManager.connect();
    this.logger.info('Database is connected.');
  }

  /**
   * Login the client to Discord.
   * @param token The token of the bot.
   * @returns Nothing.
   */
  public async login(token: string = process.env.TOKEN || process.env.token || process.env.Token): Promise<string> {
    await this.src.login(token);

    void (await this.src.application.commands.set(
      <readonly ApplicationCommandDataResolvable[]>this.commandManager.discordCommandsData,
    ));

    let i: number = -1;
    let dataMap: DataMap<TypedDataMapStored>;
    while (++i < Object.keys(this.databaseManager.dataMaps).length) {
      dataMap = Object.values(this.databaseManager.dataMaps)[i];
      if (dataMap.intents.includes(DATAMAP_INTENTS.CORE)) await dataMap.refreshCore();
    }

    this.logger.info(`The client is successfully launched on Discord as ${this.src.user.tag}.`);

    return '0';
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Function that encapsulates the command detection, authorization and execution.
   * @param interaction The associated interaction.
   * @returns The issue of the command.
   */
  public async detectAndLaunchSlashCommand(interaction: ChatInputCommandInteraction): Promise<COMMAND_END> {
    const CommandGroup: CommandGroup = this.commandManager.getCommandFromInteraction(interaction);
    if (CommandGroup.command) return HashiSlashCommand.launch(this, interaction, CommandGroup);
    return COMMAND_END.SUCCESS;
  }
}
