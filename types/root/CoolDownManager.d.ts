import { Snowflake } from 'discord.js';
/**
 * Represents an element in the cool downs queue.
 */
export type CoolDownsQueueElement = [
    /**
     The full name of the command (including the subcommands name).
     */
    string,
    /**
     * The end time of the cool down.
     */
    number,
    /**
     * The cool down amount.
     */
    number
];
/**
 * The main class who manages the active cool downs for commands.
 */
export declare class CoolDownManager {
    #private;
    /**
     * The constructor of the cool down manager.
     */
    constructor();
    /**
     * Register a cool down when a command is triggered.
     * @param userId The user id of the command author.
     * @param commandName The name of the command.
     * @param coolDown The cool down amount (waiting time before executing it again).
     * @returns Nothing.
     */
    registerCoolDown(userId: Snowflake, commandName: string, coolDown: number): void;
    /**
     * Returns all the cool downs for a specified user.
     * @param userId The user id to search for.
     * @param commandName The name of the command to filter by.
     * @returns The full list of the user cool downs.
     */
    values(userId: Snowflake, commandName?: string): CoolDownsQueueElement[];
}
