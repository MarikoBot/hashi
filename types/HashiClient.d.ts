import { ChatInputCommandInteraction, Client, ClientOptions } from 'discord.js';
import { Logger } from './Logger';
import { CommandManager } from './CommandManager';
import { EventManager } from './EventManager';
import { LanguageManager } from './LanguageManager';
import { Constants } from './Constants';
import { COMMAND_END } from './HashiSlashBaseCommand';
import { DatabaseManager } from './DatabaseManager';
import { ServiceManager } from './ServiceManager';
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
    /**
     * The Discord Client instance.
     */
    readonly src: Client;
    /**
     * The logger for the HashiClient.
     */
    readonly Logger: Logger;
    /**
     * The command manager instance.
     */
    readonly CommandManager: CommandManager;
    /**
     * The event manager instance.
     */
    readonly EventManager: EventManager;
    /**
     * The language manager for accessing strings.
     */
    readonly LanguageManager: LanguageManager;
    /**
     * The database manager for accessing data maps/lakes.
     */
    readonly DatabaseManager: DatabaseManager;
    /**
     * The services manager for accessing different services (automatic roles, etc).
     */
    readonly ServiceManager: ServiceManager;
    /**
     * The language manager for accessing strings.
     */
    readonly Constants: Constants;
    /**
     * The name of the project/process you're in.
     */
    readonly processName: string;
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
    readonly commandsDir: string;
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
    readonly eventsDir: string;
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
