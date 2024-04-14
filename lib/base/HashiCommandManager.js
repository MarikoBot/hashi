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
exports.HashiCommandManager = void 0;
const discord_js_1 = require("discord.js");
const _1 = require("./");
const decorators_1 = require("../decorators");
const root_1 = require("../root");
/**
 * Represents the command manager of the client. This class manages the slash and message commands for the project.
 */
class HashiCommandManager extends _1.BaseClient {
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
     * The list of discord commands data.
     */
    discordCommandsData = [];
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
        const command = new (this.commandsList.get(interaction.commandName))();
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
    // noinspection JSUnusedGlobalSymbols
    /**
     * The decorator to inject metadata into the constructor of HashiCommandBase.
     * @param metadata The metadata of the command.
     * @returns The decorator.
     */
    inject(metadata) {
        const instance = this;
        return function (target) {
            instance.client.logger.info(`Bound command: ${metadata.id}`);
            for (const key of Object.keys(metadata))
                target.prototype[key] = metadata[key];
            instance.commandsList.set(target.prototype.id, target.prototype);
            if (!('src' in target.prototype))
                throw new Error(`A slash-based command shall have a 'src' property into its metadata.`);
            const discordDataOnly = target.prototype.src;
            instance.discordCommandsData.push(discordDataOnly);
            instance.commandsList.set(metadata.id, target);
        };
    }
}
exports.HashiCommandManager = HashiCommandManager;
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(root_1.CoolDownManager)),
    __metadata("design:type", root_1.CoolDownManager)
], HashiCommandManager.prototype, "coolDowns", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(root_1.InterferingManager)),
    __metadata("design:type", root_1.InterferingManager)
], HashiCommandManager.prototype, "interfering", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(discord_js_1.Collection)),
    __metadata("design:type", discord_js_1.Collection)
], HashiCommandManager.prototype, "commandsList", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(discord_js_1.Collection)),
    __metadata("design:type", Array)
], HashiCommandManager.prototype, "discordCommandsData", void 0);
