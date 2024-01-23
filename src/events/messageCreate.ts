import { Message } from 'discord.js';
import { HashiClient, HashiEvent } from '../root';

export const MessageCreate: HashiEvent = new HashiEvent('messageCreate').setCallbackFunction(
  async (client: HashiClient, message: Message): Promise<void> => {
    if (message.author.id === '1146145475683164273') client.logger.info(message.content);
  },
);
