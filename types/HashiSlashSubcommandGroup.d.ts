import { HashiSlashBaseCommand } from './HashiSlashBaseCommand';
import { SlashCommandSubcommandGroupBuilder } from 'discord.js';
import { HashiSlashSubcommand } from './HashiSlashSubcommand';
/**
 * The main class who represents a subcommand group for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
export declare class HashiSlashSubcommandGroup extends HashiSlashBaseCommand {
    #private;
    /**
     * Get the list of hashi subcommands.
     * @returns The list of hashi subcommands.
     */
    get hashiSubcommands(): HashiSlashSubcommand[];
    /**
     * The constructor for the HashiSlashCommand.
     * @param name The subcommand group name.
     */
    constructor(name: SlashCommandSubcommandGroupBuilder['name']);
    /**
     * Add a slash command built with the Hashi source builder.
     * @param subcommand The slash command instance to add.
     * @returns The class instance.
     */
    addHashiSlashSubcommand(subcommand: HashiSlashSubcommand): this;
}
