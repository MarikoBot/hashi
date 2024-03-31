import { Collection } from 'discord.js';
import { BaseClient } from './';
import { HashiClient, HashiEvent } from '../root';
/**
 * Represents the event manager for the client service.
 */
export declare class EventManager extends BaseClient {
    /**
     * The collection of the events.
     */
    readonly eventsList: Collection<string, typeof HashiEvent>;
    /**
     * The constructor of the event manager.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Load the commands from the given events directory.
     * @returns Nothing.
     */
    loadEvents(): Promise<void>;
}
