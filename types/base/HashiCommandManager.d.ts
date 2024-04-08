import { APIApplicationCommand, ChatInputCommandInteraction, Collection } from 'discord.js';
import { BaseClient } from './';
import { InstanceInjector } from '../decorators';
import { AnyCommandConstructorType, CommandGroup, CommandMetadata, CoolDownManager, HashiClient, InterferingManager } from '../root';
/**
 * Represents the command manager of the client. This class manages the slash and message commands for the project.
 */
export declare class HashiCommandManager extends BaseClient {
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
    readonly commandsList: Collection<string, AnyCommandConstructorType>;
    /**
     * The list of discord commands data.
     */
    readonly discordCommandsData: APIApplicationCommand[];
    /**
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Get a slash command from the cache with the name.
     * @param interaction The interaction.
     * @returns The found command instance, or undefined.
     */
    getCommandFromInteraction(interaction: ChatInputCommandInteraction): CommandGroup;
    /**
     * The decorator to inject metadata into the constructor of HashiCommandBase.
     * @param metadata The metadata of the command.
     * @returns The decorator.
     */
    HashiCommandInjector(metadata: CommandMetadata): InstanceInjector;
}
