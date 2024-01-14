"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashSubcommand = void 0;
const HashiSlashBaseCommand_1 = require("./HashiSlashBaseCommand");
/**
 * The main class who represents a subcommand for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
class HashiSlashSubcommand extends HashiSlashBaseCommand_1.HashiSlashBaseCommand {
    /**
     * The constructor for the HashiSlashCommand.
     * @param name The name of the subcommand.
     */
    constructor(name) {
        super(name);
    }
    /**
     * The callback function executed when the command is triggered.
     *
     * @param callback The function to set.
     * @returns The class instance.
     */
    setCallbackFunction(callback) {
        if (typeof callback === 'function')
            super.setCallbackFunction(callback);
        return this;
    }
}
exports.HashiSlashSubcommand = HashiSlashSubcommand;
