"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashSubcommandGroup = void 0;
const HashiSlashBaseCommand_1 = require("./HashiSlashBaseCommand");
/**
 * The main class who represents a subcommand group for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
class HashiSlashSubcommandGroup extends HashiSlashBaseCommand_1.HashiSlashBaseCommand {
    /**
     * The list of hashi subcommands.
     */
    hashiSubcommands = [];
    /**
     * The constructor for the HashiSlashCommand.
     * @param name The subcommand group name.
     */
    constructor(name) {
        super(name);
        this.setName(name);
    }
    /**
     * Add a slash command built with the Hashi source builder.
     * @param subcommand The slash command instance to add.
     * @returns The class instance.
     */
    addHashiSlashSubcommand(subcommand) {
        subcommand.setFullName(`${this.fullName} ${subcommand.name}`);
        HashiSlashBaseCommand_1.HashiSlashBaseCommand.transformSubcommand(this, subcommand);
        this.hashiSubcommands.push(subcommand);
        return this;
    }
}
exports.HashiSlashSubcommandGroup = HashiSlashSubcommandGroup;
