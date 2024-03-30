"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashSubcommand = void 0;
const HashiCommandBase_1 = require("./HashiCommandBase");
/**
 * The class who represents a subcommand for the hashi command.
 */
class HashiSlashSubcommand extends HashiCommandBase_1.HashiCommandBase {
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor() {
        super('sub');
    }
}
exports.HashiSlashSubcommand = HashiSlashSubcommand;
