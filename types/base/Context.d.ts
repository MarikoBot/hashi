import { BaseGuildTextChannel, BaseGuildVoiceChannel, ButtonInteraction, ChatInputCommandInteraction, InteractionResponse, Message, ThreadChannel, User, InteractionReplyOptions } from 'discord.js';
import { BaseClient, Language, LanguageContentKey } from './';
import { HashiClient, CommandBlockValue } from '../root';
/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
export declare class Context extends BaseClient {
    /**
     * The language id of the main user.
     */
    languageId: Language;
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
    buttonInteraction: ButtonInteraction;
    /**
     * The constructor of the context.
     * @param client The client instance.
     * @param options The context options.
     */
    constructor(client: HashiClient, options: ContextOptions);
    /**
     * Add a user.
     * @param user The user to add.
     * @returns The class instance.
     */
    addUser(user: User): Context;
    /**
     * Remove a user.
     * @param user The user to remove.
     * @returns The class instance.
     */
    removeUser(user: User): Context;
    /**
     * Reply to an interaction.
     * @param messageData The message data to send (Discord.<BaseMessageOptions>).
     * @param interaction The interaction to reply to.
     * @returns The message instance, or null if not sent.
     */
    reply(messageData: InteractionReplyOptions | string, interaction?: Context['interaction']): Promise<Message | InteractionResponse | null>;
    /**
     * Use a string from a translation with some variables on it.
     * @param key The string to get the translation from.
     * @param vars The variables to replace on.
     * @returns The translated string.
     */
    translate(key: LanguageContentKey, ...vars: any[]): string;
    /**
     * Extract data from a string. Extract especially tags to apply properties.
     * @param str The string to extract from.
     * @param brackets The brackets to remove the content from.
     * @returns An object with the data extracted and the string without the tags.
     */
    static extractDataFromStr(str: string, brackets?: [string, string]): ExtractedDataFromString;
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
