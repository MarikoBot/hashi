import { BaseInteraction } from 'discord.js';
import { Injectors } from '../decorators';
import { HashiClient, HashiEvent, HashiEventCallbackFunction } from '../root';

/**
 * An example of use case for the HashiEvent class. Get the command and launches it using all the managers (cool downs,
 * interfering, database).
 */
@Injectors.HashiEventInjector('interactionCreate')
export class InteractionCreate extends HashiEvent {
  /**
   * The function that is called when an interaction is triggered.
   * @param client The client instance.
   * @param interaction The associated interaction.
   * @returns Nothing.
   */
  public callback: HashiEventCallbackFunction = async (
    client: HashiClient,
    interaction: BaseInteraction,
  ): Promise<void> => {
    if (interaction.isChatInputCommand()) await client.detectAndLaunchSlashCommand(interaction);
  };
}
