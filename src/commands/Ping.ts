import { COMMAND_END, HashiClient, HashiSlashCommand } from '../root';
import { ChatInputCommandInteraction } from 'discord.js';
import { Context } from '../base';

export const Ping: HashiSlashCommand = new HashiSlashCommand('ping')
  .setDescription('Replies with pong.')
  .setCallbackFunction(
    async (client: HashiClient, interaction: ChatInputCommandInteraction, context: Context): Promise<COMMAND_END> => {
      await interaction.reply({ content: 'Pong!', ephemeral: true }).catch(client.logger.clean);

      return context.command.end();
    },
  );
