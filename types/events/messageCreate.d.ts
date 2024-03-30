import { HashiEvent, HashiEventCallbackFunction } from '../root';
/**
 * An example of use case for the HashiEvent class.
 */
export declare class MessageCreate extends HashiEvent {
    /**
     * The function that is called when an interaction is triggered.
     * @param client The client instance.
     * @param message The associated message.
     * @returns Nothing.
     */
    callback: HashiEventCallbackFunction;
}
