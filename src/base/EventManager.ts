import { Collection } from 'discord.js';
import { HashiEvent } from '../root/';
import { HashiClient } from '../root/';
import * as fs from 'fs';
import * as path from 'path';
import { Base } from './Base';

/**
 * Represents the event manager for the client service.
 */
export class EventManager extends Base {
  /**
   * The collection of the events.
   */
  readonly #eventsList: Collection<string, HashiEvent> = new Collection();

  /**
   * Get the events list.
   * @returns The events list.
   */
  get eventsList(): Collection<string, HashiEvent> {
    return this.#eventsList;
  }

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
    const files: string[] = fs.readdirSync(`lib/${this.client.eventsDir}`);
    const events: HashiEvent[] = [];

    let i: number = -1;
    let eventData: HashiEvent;
    while (++i < files.length) {
      eventData = require(path.join(__dirname, `../../../../../lib/${this.client.eventsDir}/${files[i]}`));

      this.client.eventManager.eventsList.set(files[i].replace('.js', ''), eventData);
      events.push(eventData);
    }

    i = -1;
    eventData = null;
    while (++i < events.length) {
      eventData = events[i];
      eventData.setClient(this.client);
      this.client.src[eventData.name === 'ready' ? 'once' : 'on'](eventData.name, (...args: any[]) =>
        eventData.callback(this.client, ...args),
      );
    }
  }
}
