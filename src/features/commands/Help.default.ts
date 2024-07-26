import { CommandDefaultFeature } from '../shared';
import { ApplicationCommandType } from 'discord-api-types/v10';

/**
 * The default feature for the help command.
 */
const data = (_Command: any, _Client: any, _Context: any): CommandDefaultFeature => ({
  /**
   * The class instance.
   */
  default: class HelpDefault extends _Command {
    async callback(client: typeof _Client, ctx: typeof _Context): Promise<any> {
      await ctx.reply('You may get helped later.');
      return this.end();
    }
  },
  /**
   * The metadata to inject.
   */
  metadata: {
    id: 'help',
    coolDown: 5,
    src: {
      name: 'help',
      description: 'The default help command description.',
      type: ApplicationCommandType.ChatInput,
      default_member_permissions: null,
    },
  },
});

export default data;
