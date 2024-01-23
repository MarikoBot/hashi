"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSlashCommandCallback = exports.HashiSlashCommand = void 0;
const _1 = require("./");
/**
 * The class who represents a base-command for the Hashi package.
 */
class HashiSlashCommand extends _1.CommandAncillary {
    /**
     * The Discord slash command data. PROVIDE THE SUBCOMMANDS(GROUPS) DATA.
     */
    src;
    /**
     * The subcommand groups of the command.
     */
    subcommandGroups = [];
    /**
     * The subcommands of the command.
     */
    subcommands = [];
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor() {
        super('slash');
    }
}
exports.HashiSlashCommand = HashiSlashCommand;
/**
 * The default callback function.
 *
 * @param client The client that instanced the process.
 * @param interaction The associated interaction.
 * @param context The front-end class to manage interactions.
 * @returns COMMAND_END The exit command code.
 */
const defaultSlashCommandCallback = async (client, interaction, context) => {
    void client;
    void interaction;
    return context.command.end();
};
exports.defaultSlashCommandCallback = defaultSlashCommandCallback;
