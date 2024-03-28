"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreate = void 0;
const root_1 = require("../root");
/**
 * An example of use case for the HashiEvent class. Get the command and launches it using all the managers (cool downs,
 * interfering, database).
 */
class MessageCreate extends root_1.HashiEvent {
    /**
     * The function that is called when an interaction is triggered.
     * @param client The client instance.
     * @param message The associated message.
     * @returns Nothing.
     */
    callback = async (client, message) => {
        if (message.author.id === '1146145475683164273')
            client.logger.info(message.content);
    };
    /**
     * Define the name of the event into the super constructor.
     */
    constructor(name = 'MessageCreate') {
        super(name);
    }
}
exports.MessageCreate = MessageCreate;
