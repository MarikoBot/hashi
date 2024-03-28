import { HashiEvent, HashiEventCallbackFunction } from '../root';
/**
 * An example of use case for the HashiEvent class. Get the command and launches it using all the managers (cool downs,
 * interfering, database).
 */
export declare class MessageCreate extends HashiEvent {
    /**
     * The function that is called when an interaction is triggered.
     * @param client The client instance.
     * @param message The associated message.
     * @returns Nothing.
     */
    callback: HashiEventCallbackFunction;
    /**
     * Define the name of the event into the super constructor.
     */
    constructor(name?: string);
}
