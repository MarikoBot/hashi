import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  InteractionReplyOptions,
  InteractionResponse,
  Message,
  User,
} from 'discord.js';
import { BaseClient, ContextChannel, ContextOptions, Language, LanguageContentKey, Languages } from './';
import { Validators, InstanceValidator, InstanceValidatorReturner } from '../decorators';
import { PublicChatInputCommandInteraction } from '../public';
import {
  CommandGroupValue,
  HashiClient,
  HashiSlashCommand,
  HashiSlashSubcommand,
  HashiSlashSubcommandGroup,
} from '../root';

/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
export class Context extends BaseClient {
  /**
   * The language id of the main user.
   */
  @((<InstanceValidatorReturner>Validators.StringValidator.ValidLanguage)(Languages))
  public languageId: Language = 'fr';

  /**
   * The command associated with the context.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.CommandGroupValueInitial)(
    HashiSlashCommand,
    HashiSlashSubcommand,
    HashiSlashSubcommandGroup,
  ))
  public command: CommandGroupValue;

  /**
   * The users implicated in the context/action.
   */
  @Validators.ArrayValidator.OnlyUsers
  public users: User[];

  /**
   * The channel where the action occurs.
   */
  @(<InstanceValidator>Validators.ObjectValidator.ContextChannelInitial)
  public channel: ContextChannel;

  /**
   * The interaction, if there is one.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(PublicChatInputCommandInteraction))
  public interaction: ChatInputCommandInteraction;

  /**
   * The interaction button, if there is one.
   */
  @(<InstanceValidator>Validators.ObjectValidator.Matches)
  public buttonInteraction: ButtonInteraction;

  /**
   * @param client The client instance.
   * @param options The context options.
   */
  constructor(client: HashiClient, options: ContextOptions) {
    super(client);

    if (options.languageId) this.languageId = options.languageId;
    if (options.command) this.command = options.command;
    this.users = options.users;
    this.channel = options.channel;
    if (this.interaction) this.interaction = options.interaction;
    if (this.buttonInteraction) this.buttonInteraction = options.buttonInteraction;
  }

  /**
   * Reply to an interaction.
   * @param messageData The message data to send (Discord.<BaseMessageOptions>).
   * @param interaction The interaction to reply to.
   * @returns The message instance, or null if not sent.
   */
  public async reply(
    messageData: InteractionReplyOptions | string,
    interaction: Context['interaction'] = this.interaction,
  ): Promise<Message | InteractionResponse | null> {
    if (!this.channel.isTextBased()) return null;
    let message: void | InteractionResponse | Message;

    try {
      if (!interaction.deferred) message = await interaction.reply(messageData).catch(this.command.client.logger.clean);
      else message = await interaction.followUp(messageData).catch(this.command.client.logger.clean);

      if (!message) return null;
    } catch (error: unknown) {
      this.command.client.logger.clean(error);
      return null;
    }

    return message;
  }

  // TODO:
  /**
   * Use a string from a translation with some variables on it.
   * @param key The string to get the translation from.
   * @param vars The variables to replace on.
   * @returns The translated string.
   */
  public translate(key: LanguageContentKey, ...vars: any[]): string {
    const str: string[] = (<string>this.command.client.languageManager.getStr(this.languageId, key)).split('[[]]');
    let finalStr: string = str[0];

    if (vars.length > 0) {
      let i: number = -1;
      while (++i < str.length - 1) finalStr += vars[i] + str[i + 1];
      return finalStr;
    } else return str.join('??');
  }
}
