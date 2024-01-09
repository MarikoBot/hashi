"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiClient = void 0;
const discord_js_1 = require("discord.js");
const Logger_1 = require("./Logger");
const dotenv = require("dotenv");
const CommandManager_1 = require("./CommandManager");
const EventManager_1 = require("./EventManager");
const LanguageManager_1 = require("./LanguageManager");
const Constants_1 = require("./Constants");
const HashiSlashBaseCommand_1 = require("./HashiSlashBaseCommand");
const HashiSlashCommand_1 = require("./HashiSlashCommand");
const DatabaseManager_1 = require("./DatabaseManager");
const ServiceManager_1 = require("./ServiceManager");
const DataMap_1 = require("./DataMap");
dotenv.config();
/**
 * The HashiClient class. It extends the Client class from discord.js and implements extra methods for the Hashi module.
 */
class HashiClient {
    /**
     * The Discord Client instance.
     */
    #src;
    /**
     * The logger for the HashiClient.
     */
    #logger;
    /**
     * The command manager instance.
     */
    #commandManager = new CommandManager_1.CommandManager(this);
    /**
     * The event manager instance.
     */
    #eventManager = new EventManager_1.EventManager(this);
    /**
     * The language manager for accessing strings.
     */
    #languageManager = new LanguageManager_1.LanguageManager(this);
    /**
     * The database manager for accessing data maps/lakes.
     */
    #databaseManager = new DatabaseManager_1.DatabaseManager(this);
    /**
     * The services manager for accessing different services (automatic roles, etc).
     */
    #serviceManager = new ServiceManager_1.ServiceManager(this);
    /**
     * The language manager for accessing strings.
     */
    #constants = new Constants_1.Constants();
    /**
     * The name of the project/process you're in.
     */
    #processName;
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
    #commandsDir = 'commands';
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
    #eventsDir = 'events';
    /**
     * Get the Discord Client instance.
     * @returns The Discord Client instance.
     */
    get src() {
        return this.#src;
    }
    /**
     * Get the logger for the HashiClient.
     * @returns The logger for the HashiClient.
     */
    get logger() {
        return this.#logger;
    }
    /**
     * Get the command manager instance.
     * @returns The command manager instance.
     */
    get commandManager() {
        return this.#commandManager;
    }
    /**
     * Get the event manager instance.
     * @returns The event manager instance.
     */
    get eventManager() {
        return this.#eventManager;
    }
    /**
     * Get the language manager for accessing strings.
     * @returns The language manager for accessing strings.
     */
    get languageManager() {
        return this.#languageManager;
    }
    /**
     * Get the database manager for accessing data maps/lakes.
     * @returns The database manager for accessing data maps/lakes.
     */
    get databaseManager() {
        return this.#databaseManager;
    }
    /**
     * Get the services manager for accessing different services (automatic roles, etc).
     * @returns The services manager for accessing different services (automatic roles, etc).
     */
    get serviceManager() {
        return this.#serviceManager;
    }
    /**
     * Get the constants.
     * @returns The constants.
     */
    get constants() {
        return this.#constants;
    }
    /**
     * Get the name of the project/process you're in.
     * @returns The name of the project/process you're in.
     */
    get processName() {
        return this.#processName;
    }
    /**
     * Get the commands folder directory.
     * @returns The commands folder directory.
     */
    get commandsDir() {
        return this.#commandsDir;
    }
    /**
     * Get the events folder directory.
     * @returns The events folder directory.
     */
    get eventsDir() {
        return this.#eventsDir;
    }
    /**
     * The constructor for the HashiClient class.
     * @param options The options for the HashiClient.
     */
    constructor(options) {
        this.#src = new discord_js_1.Client({
            intents: options.intents || 3276799,
            failIfNotExists: options.failIfNotExists || false,
            presence: options.presence ||
                {
                    status: 'online',
                    activities: [
                        {
                            name: `with version ${require('../package.json').version}`,
                            type: discord_js_1.ActivityType['Playing'],
                        },
                    ],
                },
        });
        this.#processName = options.processName || '`Who I am ?`';
        this.#logger = new Logger_1.Logger(this.processName);
        this.#commandsDir = options.commandsDir;
        this.#eventsDir = options.eventsDir;
    }
    /**
     * Login the client to Discord.
     * @param token The token of the bot.
     * @returns Nothing.
     */
    async login(token = process.env.TOKEN || process.env.token || process.env.Token) {
        await this.eventManager.loadEvents();
        await this.src.login(token);
        await this.commandManager.loadCommands();
        let i = -1;
        let dataMap;
        while (++i < Object.keys(this.databaseManager.dataMaps).length) {
            dataMap = Object.values(this.databaseManager.dataMaps)[i];
            if (dataMap.intents.includes(DataMap_1.DATAMAP_INTENTS.CORE))
                await dataMap.refreshCore();
        }
        this.logger.info(`The client is successfully launched on Discord as ${this.src.user.tag}`);
        return '0';
    }
    /**
     * Function that encapsulates the command detection, authorization and execution.
     * @param interaction The associated interaction.
     * @returns The issue of the command.
     */
    async detectAndLaunchCommand(interaction) {
        const commandBlock = this.commandManager.getCommand(interaction);
        if (commandBlock.command)
            return HashiSlashCommand_1.HashiSlashCommand.launch(this, interaction, commandBlock);
        return HashiSlashBaseCommand_1.COMMAND_END.SUCCESS;
    }
}
exports.HashiClient = HashiClient;
