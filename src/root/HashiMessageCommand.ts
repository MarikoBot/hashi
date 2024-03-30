import { HashiCommandBase } from './HashiCommandBase';

/**
 * The class that represents a command into a message.
 */
export class HashiMessageCommand extends HashiCommandBase {
  /**
   * The constructor for a new message command.
   */
  constructor() {
    super('message');
  }
}
