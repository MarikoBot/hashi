/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ChatInputCommandInteraction, Client, ClientOptions } from 'discord.js';
import { ConnectOptions } from 'mongoose';
import { CommandManager, DatabaseManager, EventManager, LanguageManager, ServiceManager } from '../base/';
import { Constants, FileManager, Logger, COMMAND_END } from './';
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
    readonly commandManager: CommandManager;
    /**
     * The event manager instance.
     */
    readonly eventManager: EventManager;
    /**
     * The language manager for accessing strings.
     */
    readonly languageManager: LanguageManager;
    /**
     * The database manager for accessing data maps/lakes.
     */
    readonly databaseManager: DatabaseManager;
    /**
     * The services manager for accessing different services (automatic roles, etc.).
     */
    readonly serviceManager: ServiceManager;
    /**
     * The services manager for accessing different services (automatic roles, etc.).
     */
    readonly fileManager: FileManager;
    /**
     * The language manager for accessing strings.
     */
    readonly constants: Constants;
    /**
     * The name of the project/process you're in.
     */
    readonly processName: string;
    /**
     * The commands folder directory.
     */
    readonly commandsDir: string;
    /**
     * The events folder directory.
     */
    readonly eventsDir: string;
    /**
     * The services folder directory.
     */
    readonly servicesDir: string;
    /**
     * The data maps folder directory.
     */
    readonly dataMapsDir: string;
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
    detectAndLaunchSlashCommand(interaction: ChatInputCommandInteraction): Promise<COMMAND_END>;
}
/**
 * The options for the HashiClient. It extends the ClientOptions from discord.js and implements extra options for the Hashi module.
 */
export interface HashiClientOptions extends ClientOptions {
    /**
     * The name of the project/process you're in.
     */
    processName: string;
    /**
     * The commands folder directory.
     */
    commandsDir?: string;
    /**
     * The events folder directory.
     */
    eventsDir?: string;
    /**
     * The services folder directory.
     */
    servicesDir?: string;
    /**
     * The data maps folder directory.
     */
    dataMapsDir?: string;
    /**
     * The mongoose connection information.
     */
    mongoose: {
        /**
         * The database name. Not useful to change it (only for MongoDB). Default: main.
         */
        dbName?: string;
        /**
         * The connection URI.
         */
        connectionURI: string;
        /**
         * The options for the connection.
         */
        connectOptions: ConnectOptions;
    };
}
