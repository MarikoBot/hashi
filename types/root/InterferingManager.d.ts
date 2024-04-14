import { ChatInputCommandInteraction, Collection, Snowflake } from 'discord.js';
import { InterferingQueueElement } from './';
/**
 * The main class who manages the active cool downs for commands.
 */
export declare class InterferingManager {
    /**
     * The collection of the current cool downs.
     */
    readonly queue: Collection<Snowflake, InterferingQueueElement[]>;
    /**
     * Register an interfering command when this command is triggered.
     * @param userId The user id of the command author.
     * @param commandName The name of the command.
     * @param interaction The interaction id.
     * @returns Nothing.
     */
    registerInterfering(userId: Snowflake, commandName: string, interaction: ChatInputCommandInteraction): void;
    /**
     * Returns all the interfering commands for a specified user.
     * @param userId The user id to search for.
     * @param commands The names of the commands to filter by.
     * @returns The full list of the user cool downs.
     */
    values(userId: Snowflake, ...commands: string[]): InterferingQueueElement[];
    /**
     * Removes an interfering commands. If a name is passed, remove all the commands with that name.
     * If an id is passed, remove the command with the same interaction id.
     * @param userId The user id to search for.
     * @param key The value to search for; either the name of the command or the interaction id.
     * @returns Nothing.
     */
    removeInterfering(userId: Snowflake, key: string | Snowflake): void;
}
