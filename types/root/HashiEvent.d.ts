import { HashiClient } from './';
/**
 * Represents an Event on client service.
 */
export declare class HashiEvent {
    /**
     * The client instance.
     */
    client: HashiClient;
    /**
     * The event name.
     */
    name: string;
    /**
     * The callback function.
     * @param args The required (or not) arguments.
     * @returns Nothing.
     */
    callback(...args: any[]): Promise<void> | void;
    /**
     * The constructor of the event.
     * @param name The event name.
     */
    constructor(name: string);
}
