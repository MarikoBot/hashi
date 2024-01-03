import { BaseGuildTextChannel, BaseGuildVoiceChannel, ButtonInteraction, ChatInputCommandInteraction, InteractionReplyOptions, InteractionResponse, Message, ThreadChannel, User } from 'discord.js';
import { Language, LanguageContentKey } from './LanguageManager';
import { CommandBlockValue } from './CommandManager';
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
/**
 * The options for the context constructor.
 */
export interface ContextOptions {
    /**
     * The language id of the main user.
     */
    languageId?: Language;
    /**
     * The channel where the action occurs.
     */
    channel: ContextChannel;
    /**
     * The command associated with the context.
     */
    command: CommandBlockValue;
    /**
     * The interaction, if there is one.
     */
    interaction: ChatInputCommandInteraction;
    /**
     * The interaction button, if there is one.
     */
    button?: ButtonInteraction;
    /**
     * The users implicated in the context/action.
     */
    users: User[];
}
/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
export declare class Context {
    #private;
    /**
     * Get the language id.
     * @returns The language id.
     */
    get languageId(): Language;
    /**
     * Get the channel.
     * @returns The channel.
     */
    get channel(): ContextChannel;
    /**
     * Get the command.
     * @returns The command.
     */
    get command(): CommandBlockValue;
    /**
     * Get the interaction.
     * @returns The interaction.
     */
    get interaction(): ChatInputCommandInteraction;
    /**
     * Get the button interaction.
     * @returns The button interaction.
     */
    get buttonInter(): ButtonInteraction;
    /**
     * Get the users.
     * @returns The users.
     */
    get users(): User[];
    /**
     * The constructor of the context.
     * @param options The context options.
     */
    constructor(options: ContextOptions);
    /**
     * Set the language id.
     * @param languageId The language id to set.
     * @returns The class instance.
     */
    setLanguageId(languageId: Language): Context;
    /**
     * Set the channel.
     * @param channel The channel to set.
     * @returns The class instance.
     */
    setChannel(channel: ContextChannel): Context;
    /**
     * Set the command.
     * @param command The command to set.
     * @returns The class instance.
     */
    setCommand(command: CommandBlockValue): Context;
    /**
     * Set the interaction.
     * @param interaction The interaction to set.
     * @returns The class instance.
     */
    setInteraction(interaction: ChatInputCommandInteraction): Context;
    /**
     * Set the button interaction.
     * @param buttonInter The button interaction to set.
     * @returns The class instance.
     */
    setButtonInter(buttonInter: ButtonInteraction): Context;
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
