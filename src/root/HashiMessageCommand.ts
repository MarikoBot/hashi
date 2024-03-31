import { HashiCommandBase } from './';
import { Injectors } from '../decorators';

/**
 * The class that represents a command into a message.
 */
@Injectors.HashiCommandInjector({
  type: 'message',
})
export class HashiMessageCommand extends HashiCommandBase {
  /**
   * The constructor for a new message command.
   */
  constructor() {
    super('message');
  }
}
