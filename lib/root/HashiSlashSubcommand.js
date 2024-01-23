"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashSubcommand = void 0;
const CommandAncillary_1 = require("./CommandAncillary");
/**
 * The class who represents a subcommand for the hashi command.
 */
class HashiSlashSubcommand extends CommandAncillary_1.CommandAncillary {
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor() {
        super('sub');
    }
}
exports.HashiSlashSubcommand = HashiSlashSubcommand;
