import { Collection } from 'discord.js';
import { BaseClient } from './';
import { Validators, InstanceValidatorReturner, InstanceInjector, HashiEventInjectorTarget } from '../decorators';
import { HashiClient, HashiEvent } from '../root';

/**
 * Represents the event manager for the client service.
 */
export class HashiEventManager extends BaseClient {
  /**
   * The collection of the events.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(Collection))
  public readonly eventsList: Collection<string, typeof HashiEvent> = new Collection();

  /**
   * The constructor of the event manager.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    super(client);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * The decorator to inject metadata into the constructor of HashiEvent.
   * @param name The name of the event.
   * @returns The decorator.
   */
  public hashiEventInjector(name: string): InstanceInjector {
    const instance: HashiEventManager = this;
    return function (target: HashiEventInjectorTarget): void {
      target.prototype.name = name;
      instance.client.logger.info(`Bound event: ${name}`);
      instance.client.src[name === 'ready' ? 'once' : 'on'](name, (...args: any[]) =>
        new target().callback(instance.client, ...args),
      );
    };
  }
}
