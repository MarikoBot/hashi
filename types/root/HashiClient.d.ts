import { ChatInputCommandInteraction, Client } from 'discord.js';
import { HashiCommandManager, DatabaseManager, HashiEventManager, LanguageManager, Logger } from '../base/';
import { HashiClientOptions, COMMAND_END, FileManager, HashiClientChannelsOption } from './';
/**
 * The HashiClient class. It extends the Client class from discord.js and implements extra methods for the Hashi module.
 */
export declare class HashiClient {
    /**
     * The Discord Client instance.
     */
    readonly src: Client;
    /**
     * The logger for the HashiClient.
     */
    readonly logger: Logger;
    /**
     * The command manager instance.
     */
    readonly commandManager: HashiCommandManager;
    /**
     * The event manager instance.
     */
    readonly eventManager: HashiEventManager;
    /**
     * The language manager for accessing strings.
     */
    readonly languageManager: LanguageManager;
    /**
     * The database manager for accessing data maps/lakes.
     */
    readonly databaseManager: DatabaseManager;
    /**
     * The files manager for accessing different files (for handling especially).
     */
    readonly fileManager: FileManager;
    /**
     * The name of the project/process you're in.
     */
    readonly projectName: string;
    /**
     * The Discord channels where the bot can be configured/logged.
     */
    readonly configChannels: Partial<HashiClientChannelsOption>;
    /**
     * @param options The options for the HashiClient.
     */
    constructor(options: HashiClientOptions);
    /**
     * Connect the database.
     * @returns Nothing.
     */
    connectDatabase(): Promise<void>;
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
    detectAndLaunchSlashCommand(interaction: ChatInputCommandInteraction): Promise<COMMAND_END>;
}
