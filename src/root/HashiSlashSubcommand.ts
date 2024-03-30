import { HashiCommandBase } from './HashiCommandBase';

/**
 * The class who represents a subcommand for the hashi command.
 */
export class HashiSlashSubcommand extends HashiCommandBase {
  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor() {
    super('sub');
  }
}
