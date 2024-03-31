"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiClient = void 0;
const discord_js_1 = require("discord.js");
const dotenv = require("dotenv");
const base_1 = require("../base/");
const decorators_1 = require("../decorators");
const _1 = require("./");
dotenv.config();
/**
 * The HashiClient class. It extends the Client class from discord.js and implements extra methods for the Hashi module.
 */
class HashiClient {
    /**
     * The Discord Client instance.
     */
    src;
    /**
     * The logger for the HashiClient.
     */
    logger;
    /**
     * The command manager instance.
     */
    commandManager = new base_1.CommandManager(this);
    /**
     * The event manager instance.
     */
    eventManager = new base_1.EventManager(this);
    /**
     * The language manager for accessing strings.
     */
    languageManager = new base_1.LanguageManager(this);
    /**
     * The database manager for accessing data maps/lakes.
     */
    databaseManager = new base_1.DatabaseManager(this);
    /**
     * The files manager for accessing different files (for handling especially).
     */
    fileManager = new _1.FileManager(this);
    /**
     * The name of the project/process you're in.
     */
    processName;
    /**
     * The commands folder directory.
     */
    commandsDir = 'commands';
    /**
     * The events folder directory.
     */
    eventsDir = 'events';
    /**
     * The data maps folder directory.
     */
    dataMapsDir = 'data';
    /**
     * @param options The options for the HashiClient.
     */
    constructor(options) {
        this.src = new discord_js_1.Client({
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
        this.processName = options.processName || '`unknown`';
        this.logger = new _1.Logger(this.processName);
        this.commandsDir = options.commandsDir || 'commands';
        this.eventsDir = options.eventsDir || 'events';
        this.dataMapsDir = options.dataMapsDir || 'data/definitions';
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
        const CommandGroup = this.commandManager.getCommandFromInteraction(interaction);
        if (CommandGroup.command)
            return _1.HashiSlashCommand.launch(this, interaction, CommandGroup);
        return _1.COMMAND_END.SUCCESS;
    }
}
exports.HashiClient = HashiClient;
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(discord_js_1.Client)),
    __metadata("design:type", discord_js_1.Client)
], HashiClient.prototype, "src", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(_1.Logger)),
    __metadata("design:type", _1.Logger)
], HashiClient.prototype, "logger", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(base_1.CommandManager)),
    __metadata("design:type", base_1.CommandManager)
], HashiClient.prototype, "commandManager", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(base_1.EventManager)),
    __metadata("design:type", base_1.EventManager)
], HashiClient.prototype, "eventManager", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(base_1.LanguageManager)),
    __metadata("design:type", base_1.LanguageManager)
], HashiClient.prototype, "languageManager", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(base_1.DatabaseManager)),
    __metadata("design:type", base_1.DatabaseManager)
], HashiClient.prototype, "databaseManager", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(_1.FileManager)),
    __metadata("design:type", _1.FileManager)
], HashiClient.prototype, "fileManager", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], HashiClient.prototype, "processName", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], HashiClient.prototype, "commandsDir", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], HashiClient.prototype, "eventsDir", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], HashiClient.prototype, "dataMapsDir", void 0);
