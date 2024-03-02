"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiMessageCommand = void 0;
const CommandAncillary_1 = require("./CommandAncillary");
/**
 * The class that represents a command into a message.
 */
class HashiMessageCommand extends CommandAncillary_1.CommandAncillary {
    /**
     * The constructor for a new message command.
     */
    constructor() {
        super('message');
    }
}
exports.HashiMessageCommand = HashiMessageCommand;
