import { AnyComponentBuilder, ButtonInteraction, ChatInputCommandInteraction, InteractionEditReplyOptions, InteractionReplyOptions, InteractionResponse, Message, MessagePayload, User } from 'discord.js';
import { BaseClient, ContextChannel, ContextOptions } from './';
import { Client, Command } from '../root';
/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
export declare class Context extends BaseClient {
    /**
     * The command associated with the context.
     */
    command: Command;
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
     * The reply message data.
     */
    replyData: void | Message<boolean> | InteractionResponse<boolean>;
    /**
     * The list of standalone components (ref to MarikoBot).
     */
    standaloneComponents: object & {
        component?: AnyComponentBuilder;
    }[];
    /**
     * @param client The client instance.
     * @param options The context options.
     */
    constructor(client: Client, options: ContextOptions);
    /**
     * Reply to an interaction.
     * @param messageData The message data to send (Discord.<BaseMessageOptions>).
     * @param interaction The interaction to reply to.
     * @returns The message instance, or null if not sent.
     */
    reply(messageData: InteractionReplyOptions | string, interaction?: Context['interaction']): Promise<Message | InteractionResponse | null>;
    /**
     * Edit the reply to an interaction.
     * @param messageData The message data to send (Discord.<BaseMessageOptions>).
     * @param interaction The interaction to reply to.
     * @returns The message instance, or null if not sent.
     */
    editReply(messageData: InteractionEditReplyOptions | MessagePayload | string, interaction?: Context['interaction']): Promise<Message | InteractionResponse | null>;
}
