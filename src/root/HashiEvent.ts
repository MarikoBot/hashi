// noinspection JSUnusedGlobalSymbols

import { Validators } from '../decorators';
import { HashiClient } from './';
import { InstanceValidator } from '../decorators/shared';

/**
 * Represents an Event on client service.
 */
export class HashiEvent {
  /**
   * The client instance.
   */
  @((<(arg: typeof HashiClient) => InstanceValidator>Validators.ObjectValidator.IsInstanceOf)(HashiClient))
  public client: HashiClient;

  /**
   * The event name.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidId)
  public name: string;

  /**
   * The callback function.
   */
  @Validators.FunctionValidator.Matches
  public callback: HashiEventCallbackFunction = defaultEventCallback;

  /**
   * The constructor of the event.
   * @param name The event name.
   */
  constructor(name: string) {
    this.name = name;
  }
}

/**
 * A default callback function used when nothing is set.
 * @returns Nothing.
 */
export async function defaultEventCallback(): Promise<void> {
  return void setTimeout((): null => null);
}

/**
 * The model of a callback function for an event.
 * @param client The client instance.
 * @param args The command args.
 */
export type HashiEventCallbackFunction = (client: HashiClient, ...args: any[]) => void;
