import { ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js';
import { Context } from '../base';
import { COMMAND_END, CommandGroup, CommandPrivileges, HashiClient, HashiCommandType, HashiError, HashiSlashCommandCallbackFunction } from './';
/**
 * The class that includes many useful functions shared between HashiMessageCommand and SlashCommand.
 */
export declare class HashiCommandBase {
    /**
     * The type of the command.
     */
    readonly type: HashiCommandType;
    /**
     * The client instance.
     */
    client: HashiClient;
    /**
     * The name of the command.
     */
    id: string;
    /**
     * The full name of the command.
     */
    fullName: string;
    /**
     * The description of the command.
     */
    description: string;
    /**
     * The list of errors for the command occurrence.
     */
    errors: HashiError[];
    /**
     * The commands that must be executed before this one.
     * If one of the interfering commands is same-time running, this command will be ignored.
     */
    interferingCommands: ChatInputApplicationCommandData['name'][];
    /**
     * The amount of time before running the command again. Must be between 0 and 300 seconds.
     */
    coolDown: number;
    /**
     * The context of the command.
     */
    context: Context;
    /**
     * The external data for the command.
     */
    privileges: CommandPrivileges;
    /**
     * The callback function called.
     */
    callback: HashiSlashCommandCallbackFunction;
    /**
     * The base constructor of a command.
     * @param type The type of the command.
     */
    constructor(type?: HashiCommandBase['type']);
    /**
     * The function who MUST be called at the end of your program in the call back function. IT IS REALLY IMPORTANT!
     *
     * @returns The exit code of the command.
     */
    end(): COMMAND_END;
    /**
     * Returns a boolean value. If the user is authorized to run the command.
     *
     * @param interaction The interaction of the command.
     * @returns If the user can execute the command.
     */
    isAuthorized(interaction: ChatInputCommandInteraction): Promise<boolean>;
    /**
     * Verify if the cool downs, and the interfering commands of the command are ready to call the command again.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param ctx The context within the call.
     * @returns If the wall is passed or not.
     */
    static flowControlWall(client: HashiClient, interaction: ChatInputCommandInteraction, ctx: Context): Promise<boolean>;
    /**
     * Registers the cool down and the interfering commands.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param CommandGroup The hashiCommand [subclass] instance.
     * @returns Nothing.
     */
    static flowControlRegister(client: HashiClient, interaction: ChatInputCommandInteraction, CommandGroup: CommandGroup): Promise<void>;
    /**
     * Launch the basic and starting verifications.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param CommandGroup The hashiCommand [subclass] instance.
     * @returns If the command executed successfully.
     */
    static launch(client: HashiClient, interaction: ChatInputCommandInteraction, CommandGroup: CommandGroup): Promise<COMMAND_END>;
    /**
     * Refreshes the context (avoid unreadable code in the bellow method).
     *
     * @param CommandGroupValue The command block value to refresh with.
     * @param context The context to refresh with.
     * @returns The new context and the new command.
     */
    private static refreshContext;
}
