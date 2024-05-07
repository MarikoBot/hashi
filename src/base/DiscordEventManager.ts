import { Collection } from 'discord.js';
import { BaseClient } from './';
import { DiscordEventInjectorTarget, InstanceInjector, InstanceValidatorReturner, Validators } from '../decorators';
import { Client, DiscordEvent } from '../root';

/**
 * Represents the event manager for the client service.
 */
export class DiscordEventManager extends BaseClient {
  /**
   * The collection of the events.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(Collection))
  public readonly eventsList: Collection<string, typeof DiscordEvent> = new Collection();

  /**
   * The constructor of the event manager.
   * @param client The client instance.
   */
  constructor(client: Client) {
    super(client);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * The decorator to inject metadata into the constructor of DiscordEvent.
   * @param name The name of the event.
   * @param callback The called function when the event is triggered.
   * @returns The decorator.
   */
  public inject(name: string, callback: (client: Client, ...args: any[]) => Promise<void> | void): DiscordEvent {
    this.client.logger.info(`Bound event: ${name}`);

    const event: DiscordEvent = new DiscordEvent(name);
    event.callback = callback;

    this.client.src[name === 'ready' ? 'once' : 'on'](name, (...args: any[]) => event.callback(this.client, ...args));

    return event;
  }
}
