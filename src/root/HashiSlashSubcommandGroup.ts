import { CommandAncillary, HashiSlashSubcommand } from './';

/**
 * The class who represents a subcommand for the slash base.
 */
export class HashiSlashSubcommandGroup extends CommandAncillary {
  /**
   * The subcommands of the group.
   */
  public subcommands: (typeof HashiSlashSubcommand)[] = [];

  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor() {
    super('group');
  }
}
