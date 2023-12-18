"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiEvent = exports.defaultEventCallback = void 0;
const HashiClient_1 = require("./HashiClient");
/**
 * A default callback function used when nothing is set.
 * @returns Nothing.
 */
async function defaultEventCallback() {
    return void setTimeout(() => null);
}
exports.defaultEventCallback = defaultEventCallback;
/**
 * Represents an Event on client service.
 */
class HashiEvent {
    /**
     * The client instance.
     */
    #client;
    /**
     * The event name.
     */
    #name;
    /**
     * The callback function.
     */
    #callback = defaultEventCallback;
    /**
     * Get the client.
     * @returns The client.
     */
    get client() {
        return this.#client;
    }
    /**
     * Get the name.
     * @returns The name.
     */
    get name() {
        return this.#name;
    }
    /**
     * The callback function.
     * @returns The callback function.
     */
    get callback() {
        return this.#callback;
    }
    /**
     * The constructor of the event.
     * @param name The event name.
     */
    constructor(name) {
        this.#name = name;
    }
    /**
     * Set the client for the event to be successfully executed.
     * @param client The client instance.
     * @returns The class instance.
     */
    setClient(client) {
        if (client instanceof HashiClient_1.HashiClient)
            this.#client = client;
        return this;
    }
    /**
     * Set the name.
     * @param name The name to set.
     * @returns The class instance.
     */
    setName(name) {
        if (typeof name === 'string')
            this.#name = name;
        return this;
    }
    /**
     * The callback function executed when the event is triggered.
     * @param callback The function to set.
     * @returns The class instance.
     */
    setCallbackFunction(callback) {
        if (typeof callback === 'function')
            this.#callback = callback;
        return this;
    }
}
exports.HashiEvent = HashiEvent;
