import { Validators, InstanceValidator } from '../decorators';
import { HashiCommandBase, HashiSlashSubcommand } from './';

/**
 * The class who represents a subcommand for the slash base.
 */
export class HashiSlashSubcommandGroup extends HashiCommandBase {
  /**
   * The subcommands of the group.
   */
  @((<(constructible: typeof HashiSlashSubcommand) => InstanceValidator>Validators.ArrayValidator.OnlyConstructorOf)(
    HashiSlashSubcommand,
  ))
  public subcommands: (typeof HashiSlashSubcommand)[] = [];

  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor() {
    super('group');
  }
}
