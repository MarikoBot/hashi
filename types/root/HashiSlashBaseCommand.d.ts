import { ChatInputCommandInteraction, DiscordAPIError, DiscordjsError, SlashCommandBuilder } from 'discord.js';
import { Context } from '../base/Context';
import { HashiClient } from './HashiClient';
import { HashiSlashCommand } from './HashiSlashCommand';
import { CommandBlock } from '../base/CommandManager';
import { HashiSlashSubcommand } from './HashiSlashSubcommand';
import { HashiSlashSubcommandGroup } from './HashiSlashSubcommandGroup';
/**
 * Represents an error.
 */
export type HashiError = Error | DiscordjsError | DiscordAPIError;
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
 * Represents the function called back when the command is triggered.
 *
 * @param client The client that instanced the process.
 * @param interaction The associated interaction.
 * @param context The front-end class to manage interactions.
 * @returns COMMAND_END The exit command code.
 */
export type HashiSlashCommandCallbackFunction = (client: HashiClient, interaction: ChatInputCommandInteraction, context: Context) => Promise<COMMAND_END>;
/**
 * The default callback function.
 *
 * @param client The client that instanced the process.
 * @param interaction The associated interaction.
 * @param context The front-end class to manage interactions.
 * @returns COMMAND_END The exit command code.
 */
export declare const defaultCommandCallback: (client: HashiClient, interaction: ChatInputCommandInteraction, context: Context) => Promise<COMMAND_END>;
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
 * The type that represents a key included in CommandPrivileges.
 */
export type CommandPrivilegesKey = keyof CommandPrivileges;
/**
 * The class who represents a base-command for the Hashi package. Extends the SlashCommandBuilder class from Discord.js.
 */
export declare class HashiSlashBaseCommand extends SlashCommandBuilder {
    #private;
    /**
     * Get the client.
     * @returns The client.
     */
    get client(): HashiClient;
    /**
     * Get the errors.
     * @returns The errors.
     */
    get errors(): HashiError[];
    /**
     * Get the interfering commands.
     * @returns The interfering commands.
     */
    get interferingCommands(): string[];
    /**
     * Get the cool down.
     * @returns The cool down.
     */
    get coolDown(): number;
    /**
     * Get the full name.
     * @returns The full name.
     */
    get fullName(): string;
    /**
     * Get the context.
     * @returns The context.
     */
    get context(): Context;
    /**
     * Get the privileges.
     * @returns The privileges.
     */
    get privileges(): CommandPrivileges;
    /**
     * Get the callback.
     * @returns The callback.
     */
    get callback(): HashiSlashCommandCallbackFunction;
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor(name: SlashCommandBuilder['name']);
    /**
     * Set the client for the event to be successfully executed.
     * @param client The client instance.
     * @returns The class instance.
     */
    setClient(client: HashiClient): HashiSlashBaseCommand;
    /**
     * Delete the client.
     * @returns The class instance.
     */
    clearClient(): HashiSlashBaseCommand;
    /**
     * The interfering commands to set for the command.
     * @param interfering The interfering commands to set.
     * @returns The class instance.
     */
    setInterferingCommands(interfering: string[]): HashiSlashBaseCommand;
    /**
     * The cool down to set for the command.
     * @param coolDown The cool down to set.
     * @returns The class instance.
     */
    setCoolDown(coolDown: number): HashiSlashBaseCommand;
    /**
     * The full name to set for the command.
     * @param fullName The full name to set.
     * @returns The class instance.
     */
    setFullName(fullName: string): HashiSlashBaseCommand;
    /**
     * The context to set for the command.
     * @param context The context to set.
     * @returns The class instance.
     */
    setContext(context: Context): HashiSlashBaseCommand;
    /**
     * Delete the context.
     * @returns The class instance.
     */
    clearContext(): HashiSlashBaseCommand;
    /**
     * The privileges to set for the command.
     * @param privileges The privileges to set.
     * @returns The class instance.
     */
    setPrivileges(privileges: CommandPrivileges): HashiSlashBaseCommand;
    /**
     * The callback function executed when the command is triggered.
     *
     * @param callback The function to set.
     * @returns The class instance.
     */
    setCallbackFunction(callback: HashiSlashCommandCallbackFunction): HashiSlashBaseCommand;
    /**
     * Add a privilege to the command (type restriction).
     *
     * @param place The place where the restriction acts.
     * @param values The values to set for this restriction (ERASE THE EXISTING ONES).
     * @returns Nothing.
     */
    addRestrictions(place: 'Channels' | 'Users' | 'Roles' | 'Guilds', values: string[]): void;
    /**
     * Add a privilege to the command (type prohibition).
     *
     * @param place The place where the prohibition acts.
     * @param values The values to set for this prohibition (ERASE THE EXISTING ONES).
     * @returns Nothing.
     */
    addProhibitions(place: 'Channels' | 'Users' | 'Roles' | 'Guilds', values: string[]): void;
    /**
     * The function who MUST be called at the end of your program in the call back function. IT IS REALLY IMPORTANT!
     *
     * @returns The exit code of the command.
     */
    end(): COMMAND_END;
    /**
     * Add the error to the list of errors. Permits to determine the final end-of-process code.
     *
     * @param error The error to add.
     * @returns Nothing.
     */
    catch(error: HashiError): void;
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
     * Converts a slash subcommand into a Discord friendly builder.
     * Adds it directly to the origin and returns the origin.
     *
     * @param source The origin command (where the origin is from).
     * @param subcommand The origin 'subcommand'.
     * @returns Nothing.
     */
    static transformSubcommand(source: HashiSlashCommand | HashiSlashSubcommandGroup, subcommand: HashiSlashSubcommand): void;
    /**
     * Converts a slash subcommand into a Discord friendly builder.
     * Adds it directly to the origin and returns the origin.
     *
     * @param source The origin command (where the origin is from).
     * @param subcommandGroup The origin 'subcommand'.
     * @returns Nothing.
     */
    static transformSubcommandGroup(source: HashiSlashCommand, subcommandGroup: HashiSlashSubcommandGroup): void;
    /**
     * Refreshes the context (avoid unreadable code in the bellow method).
     *
     * @param commandBlockValue The command block value to refresh with.
     * @param context The context to refresh with.
     * @returns The new context and the new command.
     */
    private static refreshContext;
}
