"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiClient = void 0;
const discord_js_1 = require("discord.js");
const dotenv = require("dotenv");
const base_1 = require("../base/");
const _1 = require("./");
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
    #commandManager = new base_1.CommandManager(this);
    /**
     * The event manager instance.
     */
    #eventManager = new base_1.EventManager(this);
    /**
     * The language manager for accessing strings.
     */
    #languageManager = new base_1.LanguageManager(this);
    /**
     * The database manager for accessing data maps/lakes.
     */
    #databaseManager = new base_1.DatabaseManager(this);
    /**
     * The services manager for accessing different services (automatic roles, etc.).
     */
    #serviceManager = new base_1.ServiceManager(this);
    /**
     * The services manager for accessing different services (automatic roles, etc.).
     */
    #fileManager = new _1.FileManager(this);
    /**
     * The language manager for accessing strings.
     */
    #constants = new _1.Constants();
    /**
     * The name of the project/process you're in.
     */
    #processName;
    /**
     * The commands folder directory.
     */
    #commandsDir = 'commands';
    /**
     * The events folder directory.
     */
    #eventsDir = 'events';
    /**
     * The services folder directory.
     */
    #servicesDir = 'services';
    /**
     * The data maps folder directory.
     */
    #dataMapsDir = 'data';
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
     * Get the services manager for accessing different services (automatic roles, etc.).
     * @returns The services manager for accessing different services (automatic roles, etc.).
     */
    get serviceManager() {
        return this.#serviceManager;
    }
    /**
     * Get the files manager for accessing different files.
     * @returns The files manager for accessing different files.
     */
    get fileManager() {
        return this.#fileManager;
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
     * Get the services folder directory.
     * @returns The services folder directory.
     */
    get servicesDir() {
        return this.#servicesDir;
    }
    /**
     * Get the data maps folder directory.
     * @returns The data maps folder directory.
     */
    get dataMapsDir() {
        return this.#dataMapsDir;
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
                            name: `with version ${require('../../package.json').version}`,
                            type: discord_js_1.ActivityType['Playing'],
                        },
                    ],
                },
        });
        this.#processName = options.processName || '`unknown`';
        this.#logger = new _1.Logger(this.processName);
        this.#commandsDir = options.commandsDir || 'commands';
        this.#eventsDir = options.eventsDir || 'events';
        this.#servicesDir = options.servicesDir || 'services/classes';
        this.#dataMapsDir = options.dataMapsDir || 'data/definitions';
        this.databaseManager.dbName = options.mongoose.dbName || 'main';
        this.databaseManager.connectOptions = options.mongoose.connectOptions || { dbName: this.databaseManager.dbName };
        if (options.mongoose.connectionURI)
            this.databaseManager.connectionURI = options.mongoose.connectionURI;
    }
    /**
     * Login the client to Discord.
     * @param token The token of the bot.
     * @returns Nothing.
     */
    async login(token = process.env.TOKEN || process.env.token || process.env.Token) {
        await this.databaseManager.connect();
        this.databaseManager.loadDataMaps();
        this.serviceManager.loadServices().launchLinkedEvents();
        await this.eventManager.loadEvents();
        await this.src.login(token);
        await this.commandManager.loadCommands();
        let i = -1;
        let dataMap;
        while (++i < Object.keys(this.databaseManager.dataMaps).length) {
            dataMap = Object.values(this.databaseManager.dataMaps)[i];
            if (dataMap.intents.includes(base_1.DATAMAP_INTENTS.CORE))
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
    async detectAndLaunchSlashCommand(interaction) {
        const commandBlock = this.commandManager.getCommandFromInteraction(interaction);
        if (commandBlock.command)
            return _1.HashiSlashCommand.launch(this, interaction, commandBlock);
        return _1.COMMAND_END.SUCCESS;
    }
}
exports.HashiClient = HashiClient;
