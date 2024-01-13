"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const HashiClient_1 = require("../root/HashiClient");
/**
 * Represents the base class for each class of the package.
 */
class Base {
    /**
     * The client instance.
     */
    #client;
    /**
     * Get the client instance.
     * @returns The client instance.
     */
    get client() {
        return this.#client;
    }
    /**
     * Initialize the base class, and, if needed, the client instance.
     * @param client The client instance.
     */
    constructor(client) {
        if (client)
            this.#client = client;
    }
    /**
     * Set the client instance.
     */
    setClient(client) {
        if (client instanceof HashiClient_1.HashiClient && client.src.user.id === this.client.src.user.id)
            this.#client = client;
        return this;
    }
}
exports.Base = Base;
