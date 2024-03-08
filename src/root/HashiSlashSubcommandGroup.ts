import { Validators } from '../decorators';
import { CommandAncillary, HashiSlashSubcommand } from './';
import { InstanceValidator } from '../decorators/shared';

/**
 * The class who represents a subcommand for the slash base.
 */
export class HashiSlashSubcommandGroup extends CommandAncillary {
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
