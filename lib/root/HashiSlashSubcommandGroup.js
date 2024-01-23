"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashSubcommandGroup = void 0;
const _1 = require("./");
/**
 * The class who represents a subcommand for the slash base.
 */
class HashiSlashSubcommandGroup extends _1.CommandAncillary {
    /**
     * The subcommands of the group.
     */
    subcommands = [];
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor() {
        super('group');
    }
}
exports.HashiSlashSubcommandGroup = HashiSlashSubcommandGroup;
