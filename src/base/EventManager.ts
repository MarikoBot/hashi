import { Collection } from 'discord.js';
import { Base } from './';
import { Validators } from '../decorators';
import { FileManager, HashiClient, HashiEvent } from '../root/';

/**
 * Represents the event manager for the client service.
 */
export class EventManager extends Base {
  /**
   * The collection of the events.
   */
  @Validators.IsInstanceOf.Collection
  public readonly eventsList: Collection<string, HashiEvent> = new Collection();

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
    const eventFiles: [string, HashiEvent][] = this.client.fileManager.read<HashiEvent>(
      `${FileManager.ABSPATH}${this.client.eventsDir}`,
      `${FileManager.RMPATH}${this.client.eventsDir}`,
      {
        absPathStrSelf: `./lib/${this.client.eventsDir}`,
        rmPathStrSelf: `../${this.client.eventsDir}`,
      },
    );

    const events: HashiEvent[] = [];
    let eventData: HashiEvent;

    let i: number = -1;
    while (++i < eventFiles.length) {
      eventData = eventFiles[i][1][eventFiles[i][0]];

      this.client.eventManager.eventsList.set(eventData.name, eventData);
      events.push(eventData);
    }
    i = -1;

    while (++i < events.length) {
      eventData = events[i];
      eventData.setClient(this.client);
      this.client.src[eventData.name === 'ready' ? 'once' : 'on'](eventData.name, (...args: any[]) =>
        eventData.callback(this.client, ...args),
      );
    }
  }
}
