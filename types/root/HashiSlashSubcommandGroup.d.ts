import { CommandAncillary, HashiSlashSubcommand } from './';
/**
 * The class who represents a subcommand for the slash base.
 */
export declare class HashiSlashSubcommandGroup extends CommandAncillary {
    /**
     * The subcommands of the group.
     */
    subcommands: (typeof HashiSlashSubcommand)[];
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor();
}
