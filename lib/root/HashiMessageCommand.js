"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiMessageCommand = void 0;
const _1 = require("./");
/**
 * The class that represents a command into a message.
 */
class HashiMessageCommand extends _1.HashiCommandBase {
    /**
     * The constructor for a new message command.
     */
    constructor() {
        super('message');
    }
}
exports.HashiMessageCommand = HashiMessageCommand;
