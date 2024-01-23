import { BaseInteraction } from 'discord.js';
import { HashiClient, HashiEvent } from '../root';

export const InteractionCreate: HashiEvent = new HashiEvent('interactionCreate').setCallbackFunction(
  async (client: HashiClient, interaction: BaseInteraction): Promise<void> => {
    if (interaction.isChatInputCommand()) await client.detectAndLaunchSlashCommand(interaction);
  },
);
