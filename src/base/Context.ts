// noinspection JSUnusedGlobalSymbols

import {
  BaseGuildTextChannel,
  BaseGuildVoiceChannel,
  ButtonInteraction,
  ChatInputCommandInteraction,
  InteractionResponse,
  Message,
  ThreadChannel,
  User,
  InteractionReplyOptions,
} from 'discord.js';
import { BaseClient, Language, LanguageContentKey, Languages } from './';
import { Validators } from '../decorators';
import { PublicChatInputCommandInteraction } from '../public';
import {
  HashiClient,
  CommandBlockValue,
  HashiMessageCommand,
  HashiSlashCommand,
  HashiSlashSubcommand,
  HashiSlashSubcommandGroup,
} from '../root';
import { InstanceValidator } from '../decorators/shared';

/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
export class Context extends BaseClient {
  /**
   * The language id of the main user.
   */
  @((<(arg: typeof Languages) => InstanceValidator>Validators.StringValidator.ValidLanguage)(Languages))
  public languageId: Language = 'fr';

  /**
   * The command associated with the context.
   */
  @((<
    (
      hashiMessageCommand: typeof HashiMessageCommand,
      hashiSlashCommand: typeof HashiSlashCommand,
      hashiSlashSubcommand: typeof HashiSlashSubcommand,
      hashiSlashSubcommandGroup: typeof HashiSlashSubcommandGroup,
    ) => InstanceValidator
  >Validators.ObjectValidator.CommandBlockValueInitial)(
    HashiMessageCommand,
    HashiSlashCommand,
    HashiSlashSubcommand,
    HashiSlashSubcommandGroup,
  ))
  public command: CommandBlockValue;

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
  @((<(arg: typeof PublicChatInputCommandInteraction) => InstanceValidator>Validators.ObjectValidator.IsInstanceOf)(
    PublicChatInputCommandInteraction,
  ))
  public interaction: ChatInputCommandInteraction;

  /**
   * The interaction button, if there is one.
   */
  @(<InstanceValidator>Validators.ObjectValidator.Matches)
  public buttonInteraction: ButtonInteraction;

  /**
   * The constructor of the context.
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
   * Add a user.
   * @param user The user to add.
   * @returns The class instance.
   */
  public addUser(user: User): Context {
    if (user instanceof User) this.users.push(user);
    return this;
  }

  /**
   * Remove a user.
   * @param user The user to remove.
   * @returns The class instance.
   */
  public removeUser(user: User): Context {
    if (user instanceof User)
      this.users = this.users.filter((presentUser: User): boolean => presentUser.id !== user.id);
    return this;
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

  /**
   * Extract data from a string. Extract especially tags to apply properties.
   * @param str The string to extract from.
   * @param brackets The brackets to remove the content from.
   * @returns An object with the data extracted and the string without the tags.
   */
  public static extractDataFromStr(str: string, brackets: [string, string] = ['{{', '}}']): ExtractedDataFromString {
    const data: { [index: string]: string } = {};
    let finalStr: string = str;
    let KV: string;
    let key: string;
    let value: string;

    let i: number = -1;
    while (++i < str.split(brackets[0]).length - 1) {
      if (finalStr.split(brackets[0]).length <= 1) break;
      KV = finalStr.split(brackets[0])[1].split(brackets[1])[0];
      key = KV.split('::')[0];
      value = KV.split('::')[1];

      if (finalStr.includes(brackets[0]))
        finalStr =
          finalStr.split(brackets[0])[0] + (finalStr.includes(brackets[1]) ? finalStr.split(brackets[1])[1] : '');

      data[key] = value;
    }

    return { data, origin: finalStr };
  }
}

/**
 * The options for the context constructor.
 */
export interface ContextOptions {
  /**
   * The language id of the main user.
   */
  languageId?: Language;
  /**
   * The command associated with the context.
   */
  command: CommandBlockValue;
  /**
   * The users implicated in the context/action.
   */
  users: User[];
  /**
   * The channel where the action occurs.
   */
  channel: ContextChannel;
  /**
   * The interaction, if there is one.
   */
  interaction: ChatInputCommandInteraction;
  /**
   * The interaction button, if there is one.
   */
  buttonInteraction?: ButtonInteraction;
}

/**
 * The data extracted structure.
 */
export interface ExtractedDataFromString {
  data: {
    [varName: string]: string;
  };
  origin: string;
}

/**
 * Represents the type for a context possible channel type among Discord package.
 */
export type ContextChannel = BaseGuildTextChannel | BaseGuildVoiceChannel | ThreadChannel;
