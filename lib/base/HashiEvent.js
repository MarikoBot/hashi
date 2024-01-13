"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiEvent = exports.defaultEventCallback = void 0;
const Base_1 = require("./Base");
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
class HashiEvent extends Base_1.Base {
    /**
     * The event name.
     */
    #name;
    /**
     * The callback function.
     */
    #callback = defaultEventCallback;
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
     * @param client The client instance.
     * @param name The event name.
     */
    constructor(client, name) {
        super(client);
        this.#name = name;
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
