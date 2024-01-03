import { HashiClient } from './HashiClient';
/**
 * The model of a callback function for an event.
 * @param args The command args.
 */
export type HashiEventCallbackFunction = (...args: any[]) => void;
/**
 * A default callback function used when nothing is set.
 * @returns Nothing.
 */
export declare function defaultEventCallback(): Promise<void>;
/**
 * Represents an Event on client service.
 */
export declare class HashiEvent {
    #private;
    /**
     * Get the client.
     * @returns The client.
     */
    get client(): HashiClient;
    /**
     * Get the name.
     * @returns The name.
     */
    get name(): string;
    /**
     * The callback function.
     * @returns The callback function.
     */
    get callback(): HashiEventCallbackFunction;
    /**
     * The constructor of the event.
     * @param name The event name.
     */
    constructor(name: string);
    /**
     * Set the client for the event to be successfully executed.
     * @param client The client instance.
     * @returns The class instance.
     */
    setClient(client: HashiClient): HashiEvent;
    /**
     * Set the name.
     * @param name The name to set.
     * @returns The class instance.
     */
    setName(name: string): HashiEvent;
    /**
     * The callback function executed when the event is triggered.
     * @param callback The function to set.
     * @returns The class instance.
     */
    setCallbackFunction(callback: HashiEventCallbackFunction): HashiEvent;
}
