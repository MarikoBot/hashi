import { APIApplicationCommand } from 'discord.js';
import { Validators, InstanceValidator, InstanceValidatorReturner, Injectors } from '../decorators';
import { HashiCommandBase, HashiSlashSubcommand, HashiSlashSubcommandGroup } from './';

/**
 * The class who represents a base-command for the Hashi package.
 */
@Injectors.HashiCommandInjector({
  type: 'slash',
})
export class HashiSlashCommand extends HashiCommandBase {
  /**
   * The Discord slash command data. PROVIDE THE SUBCOMMANDS(GROUPS) DATA.
   */
  @(<InstanceValidator>Validators.ObjectValidator.Matches)
  public src: APIApplicationCommand;

  /**
   * The subcommand groups of the command.
   */
  @((<InstanceValidatorReturner>Validators.ArrayValidator.OnlyConstructorOf)(HashiSlashSubcommandGroup))
  public subcommandGroups: (typeof HashiSlashSubcommandGroup)[] = [];

  /**
   * The subcommands of the command.
   */
  @((<InstanceValidatorReturner>Validators.ArrayValidator.OnlyConstructorOf)(HashiSlashSubcommand))
  public subcommands: (typeof HashiSlashSubcommand)[] = [];

  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor() {
    super('slash');
  }
}
