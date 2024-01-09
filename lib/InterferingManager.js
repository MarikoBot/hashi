"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterferingManager = void 0;
const discord_js_1 = require("discord.js");
/**
 * The main class who manages the active cool downs for commands.
 */
class InterferingManager {
    /**
     * The collection of the current cool downs.
     */
    queue = new discord_js_1.Collection();
    /**
     * The constructor of the interfering manager.
     */
    constructor() { }
    /**
     * Register an interfering command when this command is triggered.
     * @param userId The user id of the command author.
     * @param commandName The name of the command.
     * @param interaction The interaction id.
     * @returns Nothing.
     */
    registerInterfering(userId, commandName, interaction) {
        const currentCoolDowns = this.values(userId);
        currentCoolDowns.push([commandName, interaction]);
        this.queue.set(userId, currentCoolDowns);
    }
    /**
     * Returns all the interfering commands for a specified user.
     * @param userId The user id to search for.
     * @param commands The names of the commands to filter by.
     * @returns The full list of the user cool downs.
     */
    values(userId, ...commands) {
        const currentInterfering = this.queue.get(userId) || [];
        if (commands.length > 0) {
            return currentInterfering.filter((queueElement) => commands.some((cmd) => queueElement[0].startsWith(cmd)));
        }
        return currentInterfering;
    }
    /**
     * Removes an interfering commands. If a name is passed, remove all the commands with that name.
     * If an id is passed, remove the command with the same interaction id.
     * @param userId The user id to search for.
     * @param key The value to search for; either the name of the command or the interaction id.
     * @returns Nothing.
     */
    removeInterfering(userId, key) {
        const currentInterfering = this.values(userId);
        this.queue.set(userId, currentInterfering.filter((queueElement) => {
            return queueElement[1].id !== key;
        }));
    }
}
exports.InterferingManager = InterferingManager;
