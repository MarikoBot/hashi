import { Collection } from 'discord.js';
import { BaseClient } from './';
import { Validators, InstanceValidatorReturner, InstanceInjector, HashiEventInjectorTarget } from '../decorators';
import { FileManager, HashiClient, HashiEvent } from '../root';

/**
 * Represents the event manager for the client service.
 */
export class EventManager extends BaseClient {
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

  /**
   * Load the commands from the given events directory.
   * @returns Nothing.
   */
  public async loadEvents(): Promise<void> {
    const eventFiles: [string, typeof HashiEvent][] = this.client.fileManager.read<typeof HashiEvent>(
      `${FileManager.ABSPATH}${this.client.eventsDir}`,
      `${FileManager.RMPATH}${this.client.eventsDir}`,
      {
        absPathStrSelf: `./lib/${this.client.eventsDir}`,
        rmPathStrSelf: `../${this.client.eventsDir}`,
      },
    );

    const events: (typeof HashiEvent)[] = [];
    let eventData: typeof HashiEvent;

    let i: number = -1;
    while (++i < eventFiles.length) {
      eventData = eventFiles[i][1][eventFiles[i][0]];

      this.client.eventManager.eventsList.set(eventData.name, eventData);
      events.push(eventData);
    }
    i = -1;

    let eventInstance: HashiEvent;

    while (++i < events.length) {
      eventInstance = new events[i](events[i].prototype.name);
      eventInstance.client = this.client;

      this.client.logger.info(`Bound event: ${eventInstance.name}`);
      this.client.src[eventData.name === 'ready' ? 'once' : 'on'](eventData.name, (...args: any[]) =>
        eventInstance.callback(this.client, ...args),
      );
    }
  }
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * The decorator to inject metadata into the constructor of HashiEvent.
   * @param name The name of the event.
   * @returns The decorator.
   */
  public HashiEventInjector(name: string): InstanceInjector {
    return function (target: HashiEventInjectorTarget): void {
      target.prototype.name = name;
    };
  }
}
