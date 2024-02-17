import { ChatInputCommandInteraction, DiscordjsError, DiscordAPIError, SlashCommandBuilder, APIApplicationCommand, ChatInputApplicationCommandData } from 'discord.js';
import { Context } from '../base';
import { HashiClient, HashiMessageCommand, HashiSlashCommand, HashiSlashSubcommand, HashiSlashSubcommandGroup, HashiSlashCommandCallbackFunction } from './';
/**
 * The class that includes many useful functions shared between HashiMessageCommand and SlashCommand.
 */
export declare class CommandAncillary {
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
    constructor(type?: CommandAncillary['type']);
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
     * @param commandBlock The hashiCommand [subclass] instance.
     * @returns Nothing.
     */
    static flowControlRegister(client: HashiClient, interaction: ChatInputCommandInteraction, commandBlock: CommandBlock): Promise<void>;
    /**
     * Launch the basic and starting verifications.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param commandBlock The hashiCommand [subclass] instance.
     * @returns If the command executed successfully.
     */
    static launch(client: HashiClient, interaction: ChatInputCommandInteraction, commandBlock: CommandBlock): Promise<COMMAND_END>;
    /**
     * Refreshes the context (avoid unreadable code in the bellow method).
     *
     * @param commandBlockValue The command block value to refresh with.
     * @param context The context to refresh with.
     * @returns The new context and the new command.
     */
    private static refreshContext;
}
/**
 * The decorator that insert metadata into a command.
 * @param commandMetadata The metadata to set.
 */
export declare const CommandMetadataInjector: (commandMetadata: Partial<Record<CommandMetadataKeys, CommandMetadata[CommandMetadataKeys]>>) => Function;
/**
 * The value that is returned when the command is finished.
 */
export declare enum COMMAND_END {
    /**
     * When the command terminates goodly.
     */
    SUCCESS = 0,
    /**
     * When the command did not terminate.
     */
    ERROR = 1,
    /**
     * When the command terminates but with some problems that occurred in the process.
     */
    ISSUED = 1
}
/**
 * The command block that includes the command, subcommands and/or subcommand groups.
 */
export interface CommandBlock {
    /**
     * The command constructor.
     */
    command: HashiSlashCommand | HashiMessageCommand;
    /**
     * The subcommand group constructor.
     */
    subcommandGroup?: HashiSlashSubcommandGroup;
    /**
     * The subcommand constructor.
     */
    subcommand?: HashiSlashSubcommand;
}
/**
 * The interface that represents a command metadata.
 */
export interface CommandMetadata {
    /**
     * The client instance.
     */
    client: HashiClient;
    /**
     * The type of the command.
     */
    type: HashiCommandType;
    /**
     * The name of the command.
     */
    id: string;
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
     * The slash command if there is one.
     */
    slashCommand: SlashCommandBuilder;
    /**
     * The slash command but the hashi builder.
     */
    hashiCommand: SlashCommandBuilder;
    /**
     * The command data for the hashi slash command.
     */
    src?: APIApplicationCommand;
}
/**
 * The privileges for a command (restrictions and prohibition).
 */
export interface CommandPrivileges {
    /**
     * If the command is forbidden in some specific channels.
     */
    forbiddenChannels?: string[];
    /**
     * If the command is forbidden for some specific users.
     */
    forbiddenUsers?: string[];
    /**
     * If the command is forbidden for some specific roles.
     */
    forbiddenRoles?: string[];
    /**
     * If the command is forbidden for some specific guilds.
     */
    forbiddenGuilds?: string[];
    /**
     * If the command is only allowed in some specific channels only.
     */
    uniqueChannels?: string[];
    /**
     * If the command is only allowed by some specific users only.
     */
    uniqueUsers?: string[];
    /**
     * If the command is only allowed by some specific roles only.
     */
    uniqueRoles?: string[];
    /**
     * If the command is only allowed in some specific guilds only.
     */
    uniqueGuilds?: string[];
}
/**
 * Represents any command constructor.
 */
export type AnyCommandConstructor = typeof HashiMessageCommand | typeof HashiSlashCommand | typeof HashiSlashSubcommand | typeof HashiSlashSubcommandGroup;
/**
 * The type that represents an element of CommandBlock.
 */
export type CommandBlockValue = CommandBlock[keyof CommandBlock];
/**
 * The keys of the command metadata.
 */
export type CommandMetadataKeys = keyof CommandMetadata;
/**
 * The type that represents a key included in CommandPrivileges.
 */
export type CommandPrivilegesKey = keyof CommandPrivileges;
/**
 * The different values of for the HashiCommandType type.
 */
export declare const HashiCommandValues: string[];
/**
 * The different types of command.
 */
export type HashiCommandType = (typeof HashiCommandValues)[number];
/**
 * Represents an error.
 */
export type HashiError = Error | DiscordjsError | DiscordAPIError;
