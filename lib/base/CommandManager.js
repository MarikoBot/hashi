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
exports.CommandManager = void 0;
const discord_js_1 = require("discord.js");
const _1 = require("./");
const decorators_1 = require("../decorators");
const root_1 = require("../root/");
/**
 * Represents the command manager of the client. This class manages the slash and message commands for the project.
 */
class CommandManager extends _1.BaseClient {
    /**
     * The cool downs' manager instance, to get access to the different delays of the current command.
     */
    coolDowns = new root_1.CoolDownManager();
    /**
     * The interfering manager instance, to have access to the different executing commands.
     */
    interfering = new root_1.InterferingManager();
    /**
     * The list of commands.
     */
    commandsList = new discord_js_1.Collection();
    /**
     * @param client The client instance.
     */
    constructor(client) {
        super(client);
    }
    /**
     * Get a slash command from the cache with the name.
     * @param interaction The interaction.
     * @returns The found command instance, or undefined.
     */
    getCommandFromInteraction(interaction) {
        let command = new (this.commandsList.get(interaction.commandName))();
        const commandSubcommandGroupOption = command.subcommandGroups.length
            ? interaction.options.getSubcommandGroup()
            : null;
        const commandSubcommandOption = command.subcommands.length ? interaction.options.getSubcommand() : null;
        let subcommandGroup;
        let subcommand;
        if (commandSubcommandGroupOption) {
            subcommandGroup = command.subcommandGroups
                .map((group) => new group())
                .filter((group) => group.id === commandSubcommandGroupOption)
                ?.at(0);
            subcommand = subcommandGroup.subcommands
                .map((group) => new group())
                .filter((cmd) => cmd.id === commandSubcommandOption)
                ?.at(0);
            subcommandGroup.client = this.client;
            subcommand.client = this.client;
        }
        else if (commandSubcommandOption) {
            subcommand = command.subcommands
                .map((group) => new group())
                .filter((cmd) => cmd.id === commandSubcommandOption)
                ?.at(0);
            subcommand.client = this.client;
        }
        command.client = this.client;
        return { command, subcommand, subcommandGroup };
    }
    // TODO:
    /**
     * Returns a message command from a message create event. Cached commands only.
     * @param message The message.
     * @returns The found command instance, or undefined.
     */
    getCommandFromMessage(message) {
        let command = new (this.commandsList.get(message.content))();
        return { command, subcommand: command };
    }
    /**
     * Load the commands from the given commands directory.
     * @param dirName The directory to load on.
     * @returns Nothing.
     */
    async commandsScraper(dirName) {
        const commandFiles = this.client.fileManager.read(`${root_1.FileManager.ABSPATH}${dirName}`, `${root_1.FileManager.RMPATH}${dirName}`);
        const commands = [];
        let commandData;
        for (const file of commandFiles) {
            commandData = file[1];
            this.client.commandManager.commandsList.set(commandData.prototype.id, commandData);
            if ('src' in commandData.prototype) {
                const discordDataOnly = commandData.prototype.src;
                commands.push(discordDataOnly);
            }
        }
        void (await this.client.src.application.commands.set(commands));
    }
    /**
     * Load the commands from the given commands directory.
     * @returns Nothing.
     */
    async loadCommands() {
        await this.commandsScraper(`${this.client.commandsDir}/message`);
        await this.commandsScraper(`${this.client.commandsDir}/slash`);
    }
}
exports.CommandManager = CommandManager;
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(root_1.CoolDownManager)),
    __metadata("design:type", root_1.CoolDownManager)
], CommandManager.prototype, "coolDowns", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(root_1.InterferingManager)),
    __metadata("design:type", root_1.InterferingManager)
], CommandManager.prototype, "interfering", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(discord_js_1.Collection)),
    __metadata("design:type", discord_js_1.Collection)
], CommandManager.prototype, "commandsList", void 0);
