import { HashiClient } from '../root/HashiClient';
import { Base } from './Base';
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
export declare class HashiEvent extends Base {
    #private;
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
     * @param client The client instance.
     * @param name The event name.
     */
    constructor(client: HashiClient, name: string);
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
