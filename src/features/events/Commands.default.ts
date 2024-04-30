import { EventDefaultFeature } from '../shared';
import { BaseInteraction } from 'discord.js';

/**
 * The default feature for the command handler.
 */
const data = (_DiscordEvent: any, _Client: any): EventDefaultFeature => ({
  /**
   * The class instance.
   */
  default: class CommandsDefault extends _DiscordEvent {
    callback(client: typeof _Client, interaction: BaseInteraction): Promise<void> | void {
      if (interaction.isChatInputCommand()) return void client.commands.detectAndLaunchSlashCommand(interaction);
      return void null;
    }
  },
  /**
   * The metadata to inject.
   */
  eventName: 'interactionCreate',
});

export default data;
