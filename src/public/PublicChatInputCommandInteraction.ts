import { ChatInputCommandInteraction } from 'discord.js';

/**
 * The public remaster of the Discord.js interaction.
 */
export class PublicChatInputCommandInteraction extends ChatInputCommandInteraction {
  constructor(...args: any[]) {
    super(args[0], args[1]);
  }
}
