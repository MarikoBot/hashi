import { Collection } from 'discord.js';
import { BaseClient } from './';
import { Client, DiscordEvent } from '../root';
/**
 * Represents the event manager for the client service.
 */
export declare class DiscordEventManager extends BaseClient {
    /**
     * The collection of the events.
     */
    readonly eventsList: Collection<string, typeof DiscordEvent>;
    /**
     * The constructor of the event manager.
     * @param client The client instance.
     */
    constructor(client: Client);
    /**
     * The decorator to inject metadata into the constructor of DiscordEvent.
     * @param name The name of the event.
     * @param callback The called function when the event is triggered.
     * @returns The decorator.
     */
    inject(name: string, callback: (client: Client, ...args: any[]) => Promise<void> | void): DiscordEvent;
}
