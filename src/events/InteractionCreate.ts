import { BaseInteraction } from 'discord.js';
import { HashiClient, HashiEvent } from '../root';

const event = new HashiEvent('interactionCreate');
event.callback = async (client: HashiClient, interaction: BaseInteraction): Promise<void> => {
  if (interaction.isChatInputCommand()) await client.detectAndLaunchSlashCommand(interaction);
};

export const InteractionCreate: HashiEvent = event;
