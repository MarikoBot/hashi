import { Message } from 'discord.js';
import { HashiClient, HashiEvent, HashiEventCallbackFunction } from '../root';

/**
 * An example of use case for the HashiEvent class. Get the command and launches it using all the managers (cool downs,
 * interfering, database).
 */
export class MessageCreate extends HashiEvent {
  /**
   * The function that is called when an interaction is triggered.
   * @param client The client instance.
   * @param message The associated message.
   * @returns Nothing.
   */
  public callback: HashiEventCallbackFunction = async (client: HashiClient, message: Message): Promise<void> => {
    if (message.author.id === '1146145475683164273') client.logger.info(message.content);
  };

  /**
   * Define the name of the event into the super constructor.
   */
  constructor(name: string = 'MessageCreate') {
    super(name);
  }
}
