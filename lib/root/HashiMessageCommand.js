"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiMessageCommand = void 0;
const HashiCommandBase_1 = require("./HashiCommandBase");
/**
 * The class that represents a command into a message.
 */
class HashiMessageCommand extends HashiCommandBase_1.HashiCommandBase {
    /**
     * The constructor for a new message command.
     */
    constructor() {
        super('message');
    }
}
exports.HashiMessageCommand = HashiMessageCommand;
