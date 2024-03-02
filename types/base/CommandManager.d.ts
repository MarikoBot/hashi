import { ChatInputCommandInteraction, Collection, Message } from 'discord.js';
import { BaseClient } from './';
import { CoolDownManager, HashiClient, InterferingManager, CommandBlock, AnyCommandConstructor } from '../root/';
/**
 * Represents the command manager of the client.
 */
export declare class CommandManager extends BaseClient {
    /**
     * The cool downs' manager instance, to get access to the different delays of the current command.
     */
    readonly coolDowns: CoolDownManager;
    /**
     * The interfering manager instance, to have access to the different executing commands.
     */
    readonly interfering: InterferingManager;
    /**
     * The list of commands.
     */
    readonly commandsList: Collection<string, AnyCommandConstructor>;
    /**
     * The constructor of the command manager.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Add a command to the client (the bot) using the name, options and or the command itself.
     * If no command is passed, the function creates one based on the data passed.
     * @param commandData The options passed (name, command options, command instance).
     * @returns The command manager instance (this).
     */
    addCommand(commandData: AnyCommandConstructor): CommandManager;
    /**
     * Get a command from the cache with the name.
     * @param interaction The interaction.
     * @returns The found command instance, or undefined.
     */
    getCommandFromInteraction(interaction: ChatInputCommandInteraction): CommandBlock;
    /**
     * Returns a message command from a message create event. Cached commands only.
     * @param message The message.
     * @returns The found command instance, or undefined.
     */
    getCommandFromMessage(message: Message): CommandBlock;
    /**
     * Load the commands from the given commands directory.
     * @returns Nothing.
     */
    loadCommands(): Promise<void>;
}
