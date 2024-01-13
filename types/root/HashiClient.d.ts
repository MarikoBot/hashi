import { ChatInputCommandInteraction, Client, ClientOptions } from 'discord.js';
import { Logger } from './Logger';
import { CommandManager } from '../base/';
import { EventManager } from '../base/';
import { LanguageManager } from '../base/';
import { Constants } from './Constants';
import { COMMAND_END } from './HashiSlashBaseCommand';
import { DatabaseManager } from '../base/';
import { ServiceManager } from '../base/';
/**
 * The options for the HashiClient. It extends the ClientOptions from discord.js and implements extra options for the Hashi module.
 */
export interface HashiClientOptions extends ClientOptions {
    /**
     * The name of the project/process you're in.
     */
    processName: string;
    /**
     * The commands folder directory. How to export your commands?
     * @example
     * // If the events directory has been set to "commands":
     * // File ./commands/ping.ts
     * import {HashiSlashCommand} from '@elouannh/hashi';
     *
     * const command: HashiSlashCommand = new HashiSlashCommand('ping')
     *   .setDescription('Replies "pong"!')
     *   .callbackFunction(async (client, interaction, context) => context.reply('pong'));
     *
     * export default command;
     */
    commandsDir: string;
    /**
     * The events folder directory. How to export your events?
     * @example
     * // If the events directory has been set to "events":
     * // File ./events/ready.ts
     * import {Event} from '@elouannh/hashi';
     *
     * const event: Event = new Event('ready')
     *   .callbackFunction(async (client) => console.log('client is ready!'));
     *
     * export default event;
     */
    eventsDir: string;
}
/**
 * The HashiClient class. It extends the Client class from discord.js and implements extra methods for the Hashi module.
 */
export declare class HashiClient {
    #private;
    /**
     * Get the Discord Client instance.
     * @returns The Discord Client instance.
     */
    get src(): Client;
    /**
     * Get the logger for the HashiClient.
     * @returns The logger for the HashiClient.
     */
    get logger(): Logger;
    /**
     * Get the command manager instance.
     * @returns The command manager instance.
     */
    get commandManager(): CommandManager;
    /**
     * Get the event manager instance.
     * @returns The event manager instance.
     */
    get eventManager(): EventManager;
    /**
     * Get the language manager for accessing strings.
     * @returns The language manager for accessing strings.
     */
    get languageManager(): LanguageManager;
    /**
     * Get the database manager for accessing data maps/lakes.
     * @returns The database manager for accessing data maps/lakes.
     */
    get databaseManager(): DatabaseManager;
    /**
     * Get the services manager for accessing different services (automatic roles, etc).
     * @returns The services manager for accessing different services (automatic roles, etc).
     */
    get serviceManager(): ServiceManager;
    /**
     * Get the constants.
     * @returns The constants.
     */
    get constants(): Constants;
    /**
     * Get the name of the project/process you're in.
     * @returns The name of the project/process you're in.
     */
    get processName(): string;
    /**
     * Get the commands folder directory.
     * @returns The commands folder directory.
     */
    get commandsDir(): string;
    /**
     * Get the events folder directory.
     * @returns The events folder directory.
     */
    get eventsDir(): string;
    /**
     * The constructor for the HashiClient class.
     * @param options The options for the HashiClient.
     */
    constructor(options: HashiClientOptions);
    /**
     * Login the client to Discord.
     * @param token The token of the bot.
     * @returns Nothing.
     */
    login(token?: string): Promise<string>;
    /**
     * Function that encapsulates the command detection, authorization and execution.
     * @param interaction The associated interaction.
     * @returns The issue of the command.
     */
    detectAndLaunchCommand(interaction: ChatInputCommandInteraction): Promise<COMMAND_END>;
}
