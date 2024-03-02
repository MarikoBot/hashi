import { Message } from 'discord.js';
import { HashiClient, HashiEvent } from '../root';

const event = new HashiEvent('messageCreate');
event.callback = async (client: HashiClient, message: Message): Promise<void> => {
  if (message.author.id === '1146145475683164273') client.logger.info(message.content);
};

export const MessageCreate: HashiEvent = event;
