import { ChatInputCommandInteraction, Collection, Message } from 'discord.js';
import { Base } from './';
import { CoolDownManager, HashiClient, InterferingManager, CommandBlock, AnyCommandConstructor } from '../root/';
/**
 * Represents the command manager of the client.
 */
export declare class CommandManager extends Base {
    #private;
    /**
     * Get the cool downs' manager.
     * @returns The cool downs' manager.
     */
    get coolDowns(): CoolDownManager;
    /**
     * Get the interfering manager.
     * @returns The interfering manager.
     */
    get interfering(): InterferingManager;
    /**
     * Get the list of commands.
     * @returns The list of commands.
     */
    get commandsList(): Collection<string, AnyCommandConstructor>;
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
