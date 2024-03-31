import { APIApplicationCommand } from 'discord.js';
import { InstanceValidator, InstanceValidatorReturner, Validators } from '../decorators';
import { HashiCommandBase, HashiSlashSubcommandGroup, HashiSlashSubcommand } from './';

/**
 * The class who represents a base-command for the Hashi package.
 */
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
}
