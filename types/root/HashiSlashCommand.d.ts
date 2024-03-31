import { APIApplicationCommand } from 'discord.js';
import { HashiCommandBase, HashiSlashSubcommandGroup, HashiSlashSubcommand } from './';
/**
 * The class who represents a base-command for the Hashi package.
 */
export declare class HashiSlashCommand extends HashiCommandBase {
    /**
     * The Discord slash command data. PROVIDE THE SUBCOMMANDS(GROUPS) DATA.
     */
    src: APIApplicationCommand;
    /**
     * The subcommand groups of the command.
     */
    subcommandGroups: (typeof HashiSlashSubcommandGroup)[];
    /**
     * The subcommands of the command.
     */
    subcommands: (typeof HashiSlashSubcommand)[];
}
