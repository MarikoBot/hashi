import { Validators, InstanceValidatorReturner } from '../decorators';
import { HashiCommandBase, HashiSlashSubcommand } from './';

/**
 * The class who represents a subcommand for the slash base.
 */
export class HashiSlashSubcommandGroup extends HashiCommandBase {
  /**
   * The subcommands of the group.
   */
  @((<InstanceValidatorReturner>Validators.ArrayValidator.OnlyConstructorOf)(HashiSlashSubcommand))
  public subcommands: (typeof HashiSlashSubcommand)[] = [];
}
