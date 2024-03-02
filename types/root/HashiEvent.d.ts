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
     */
    callback: HashiEventCallbackFunction;
    /**
     * The constructor of the event.
     * @param name The event name.
     */
    constructor(name: string);
}
/**
 * A default callback function used when nothing is set.
 * @returns Nothing.
 */
export declare function defaultEventCallback(): Promise<void>;
/**
 * The model of a callback function for an event.
 * @param client The client instance.
 * @param args The command args.
 */
export type HashiEventCallbackFunction = (client: HashiClient, ...args: any[]) => void;
