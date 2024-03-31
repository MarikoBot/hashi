import { ButtonInteraction, ChatInputCommandInteraction, InteractionReplyOptions, InteractionResponse, Message, User } from 'discord.js';
import { BaseClient, ContextChannel, ContextOptions, Language, LanguageContentKey } from './';
import { CommandGroupValue, HashiClient } from '../root';
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
    command: CommandGroupValue;
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
     * @param client The client instance.
     * @param options The context options.
     */
    constructor(client: HashiClient, options: ContextOptions);
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
}
