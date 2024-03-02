import { CommandAncillary } from './CommandAncillary';

/**
 * The class that represents a command into a message.
 */
export class HashiMessageCommand extends CommandAncillary {
  /**
   * The constructor for a new message command.
   */
  constructor() {
    super('message');
  }
}

/**
 * Represents a parameter for a command.
 */
export interface HashiMessageCommandParameter {}
