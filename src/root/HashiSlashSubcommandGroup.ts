import { Validators, Injectors, InstanceValidatorReturner } from '../decorators';
import { HashiCommandBase, HashiSlashSubcommand } from './';

/**
 * The class who represents a subcommand for the slash base.
 */
@Injectors.HashiCommandInjector({
  type: 'group',
})
export class HashiSlashSubcommandGroup extends HashiCommandBase {
  /**
   * The subcommands of the group.
   */
  @((<InstanceValidatorReturner>Validators.ArrayValidator.OnlyConstructorOf)(HashiSlashSubcommand))
  public subcommands: (typeof HashiSlashSubcommand)[] = [];

  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor() {
    super('group');
  }
}
