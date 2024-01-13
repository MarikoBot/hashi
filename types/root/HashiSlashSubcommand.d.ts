import { HashiSlashBaseCommand } from './HashiSlashBaseCommand';
/**
 * The main class who represents a subcommand for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
export declare class HashiSlashSubcommand extends HashiSlashBaseCommand {
    /**
     * The constructor for the HashiSlashCommand.
     * @param name The name of the subcommand.
     */
    constructor(name: HashiSlashBaseCommand['name']);
}
