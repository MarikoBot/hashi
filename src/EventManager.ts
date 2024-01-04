import { Collection } from 'discord.js';
import { HashiEvent } from './HashiEvent';
import { HashiClient } from './HashiClient';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Represents the event manager for the client service.
 */
export class EventManager {
  /**
   * The client instance.
   */
  public readonly client: HashiClient;

  /**
   * The collection of the events.
   */
  private readonly eventsList: Collection<string, HashiEvent> = new Collection();

  /**
   * The constructor of the event manager.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    this.client = client;
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
      eventData = require(path.join(__dirname, `../../${this.client.eventsDir}/${files[i]}`));

      this.client.EventManager.eventsList.set(files[i].replace('.js', ''), eventData);
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
