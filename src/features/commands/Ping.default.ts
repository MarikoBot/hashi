import { CommandDefaultFeature } from '../shared';
import { ApplicationCommandType } from 'discord-api-types/v10';

/**
 * The default feature for the ping command.
 */
const data = (_Command: any, _Client: any, _Context: any): CommandDefaultFeature => ({
  /**
   * The class instance.
   */
  default: class PingDefault extends _Command {
    async callback(client: typeof _Client, ctx: typeof _Context): Promise<any> {
      await ctx.reply(`My ping is **\`${client.src.ws.ping}\`**ms.`);
      return this.end();
    }
  },
  /**
   * The metadata to inject.
   */
  metadata: {
    id: 'ping',
    coolDown: 5,
    src: {
      name: 'ping',
      description: 'The default ping command description.',
      type: ApplicationCommandType.ChatInput,
      default_member_permissions: null,
    },
  },
});

export default data;
