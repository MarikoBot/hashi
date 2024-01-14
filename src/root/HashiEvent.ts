// noinspection JSUnusedGlobalSymbols

import { HashiClient } from './HashiClient';

/**
 * The model of a callback function for an event.
 * @param client The client instance.
 * @param args The command args.
 */
export type HashiEventCallbackFunction = (client: HashiClient, ...args: any[]) => void;

/**
 * A default callback function used when nothing is set.
 * @returns Nothing.
 */
export async function defaultEventCallback(): Promise<void> {
  return void setTimeout((): null => null);
}

/**
 * Represents an Event on client service.
 */
export class HashiEvent {
  /**
   * The client instance.
   */
  #client: HashiClient;

  /**
   * The event name.
   */
  #name: string;

  /**
   * The callback function.
   */
  #callback: HashiEventCallbackFunction = defaultEventCallback;

  /**
   * Get the client instance.
   * @returns The client instance.
   */
  get client(): HashiClient {
    return this.#client;
  }

  /**
   * Get the name.
   * @returns The name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * The callback function.
   * @returns The callback function.
   */
  get callback(): HashiEventCallbackFunction {
    return this.#callback;
  }

  /**
   * The constructor of the event.
   * @param name The event name.
   */
  constructor(name: string) {
    this.#name = name;
  }

  /**
   * Set the name.
   * @param name The name to set.
   * @returns The class instance.
   */
  public setName(name: string): HashiEvent {
    if (typeof name === 'string') this.#name = name;
    return this;
  }

  /**
   * The callback function executed when the event is triggered.
   * @param callback The function to set.
   * @returns The class instance.
   */
  public setCallbackFunction(callback: HashiEventCallbackFunction): HashiEvent {
    if (typeof callback === 'function') this.#callback = callback;
    return this;
  }

  /**
   * Set the client instance.
   * @param client The client instance to set.
   * @returns The class instance.
   */
  public setClient(client: HashiClient): HashiEvent {
    if (client instanceof HashiClient) this.#client = client;
    return this;
  }
}
