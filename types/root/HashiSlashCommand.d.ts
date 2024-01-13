import { HashiSlashBaseCommand } from './HashiSlashBaseCommand';
import { HashiSlashSubcommand } from './HashiSlashSubcommand';
import { HashiSlashSubcommandGroup } from './HashiSlashSubcommandGroup';
/**
 * The main class who represents a command for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
export declare class HashiSlashCommand extends HashiSlashBaseCommand {
    #private;
    /**
     * Get the list of hashi subcommands.
     * @returns The list of hashi subcommands.
     */
    get hashiSubcommands(): HashiSlashSubcommand[];
    /**
     * Get the list of hashi subcommand groups.
     * @returns The list of hashi subcommand groups.
     */
    get hashiSubcommandsGroups(): HashiSlashSubcommandGroup[];
    /**
     * The constructor for the HashiSlashCommand.
     * @param name The name of the command.
     */
    constructor(name: HashiSlashBaseCommand['name']);
    /**
     * Add a slash command built with the Hashi source builder.
     * @param subcommand The slash command instance to add.
     * @returns The class instance.
     */
    addHashiSlashSubcommand(subcommand: HashiSlashSubcommand): this;
    /**
     * Add a slash command built with the Hashi source builder.
     * @param subcommandGroup The slash command group instance to add.
     * @returns The class instance.
     */
    addHashiSlashSubcommandGroup(subcommandGroup: HashiSlashSubcommandGroup): this;
}
