"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashCommand = void 0;
const HashiSlashBaseCommand_1 = require("./HashiSlashBaseCommand");
/**
 * The main class who represents a command for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
class HashiSlashCommand extends HashiSlashBaseCommand_1.HashiSlashBaseCommand {
    /**
     * The list of hashi subcommands.
     */
    #hashiSubcommands = [];
    /**
     * The list of hashi subcommand groups.
     */
    #hashiSubcommandsGroups = [];
    /**
     * Get the list of hashi subcommands.
     * @returns The list of hashi subcommands.
     */
    get hashiSubcommands() {
        return this.#hashiSubcommands;
    }
    /**
     * Get the list of hashi subcommand groups.
     * @returns The list of hashi subcommand groups.
     */
    get hashiSubcommandsGroups() {
        return this.#hashiSubcommandsGroups;
    }
    /**
     * The constructor for the HashiSlashCommand.
     * @param name The name of the command.
     */
    constructor(name) {
        super(name);
        this.setFullName(name);
    }
    /**
     * Add a slash command built with the Hashi source builder.
     * @param subcommand The slash command instance to add.
     * @returns The class instance.
     */
    addHashiSlashSubcommand(subcommand) {
        subcommand.setFullName(`${this.name} ${subcommand.name}`);
        HashiSlashBaseCommand_1.HashiSlashBaseCommand.transformSubcommand(this, subcommand);
        this.hashiSubcommands.push(subcommand);
        return this;
    }
    /**
     * Add a slash command built with the Hashi source builder.
     * @param subcommandGroup The slash command group instance to add.
     * @returns The class instance.
     */
    addHashiSlashSubcommandGroup(subcommandGroup) {
        subcommandGroup.setFullName(`${this.name} ${subcommandGroup.name}`);
        HashiSlashBaseCommand_1.HashiSlashBaseCommand.transformSubcommandGroup(this, subcommandGroup);
        this.hashiSubcommandsGroups.push(subcommandGroup);
        return this;
    }
}
exports.HashiSlashCommand = HashiSlashCommand;
