import { HashiClient, HashiEventCallbackFunction } from './';
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
    constructor(name?: string);
}
