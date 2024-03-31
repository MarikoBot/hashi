import { HashiCommandBase, HashiSlashSubcommand } from './';
/**
 * The class who represents a subcommand for the slash base.
 */
export declare class HashiSlashSubcommandGroup extends HashiCommandBase {
    /**
     * The subcommands of the group.
     */
    subcommands: (typeof HashiSlashSubcommand)[];
}
