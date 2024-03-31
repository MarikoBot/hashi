import { Injectors } from '../decorators';
import { HashiCommandBase } from './';

/**
 * The class who represents a subcommand for the hashi command.
 */
@Injectors.HashiCommandInjector({
  type: 'sub',
})
export class HashiSlashSubcommand extends HashiCommandBase {
  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor() {
    super('sub');
  }
}
