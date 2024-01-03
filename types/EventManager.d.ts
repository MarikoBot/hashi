import { HashiClient } from './HashiClient';
/**
 * Represents the event manager for the client service.
 */
export declare class EventManager {
    /**
     * The client instance.
     */
    readonly client: HashiClient;
    /**
     * The collection of the events.
     */
    private readonly eventsList;
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
