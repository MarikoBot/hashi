// noinspection JSUnusedGlobalSymbols

import { HashiClient } from './HashiClient';
import { ClientEvents } from 'discord.js';
import { DataMap, DataMapDefinition, TypedDataMapStored } from './DataMap';
import { SchemaDefinition } from 'mongoose';
import { Base } from './Base';

/**
 * The type representing the key name of an event.
 */
export type ClientEventsKey = keyof ClientEvents;

/**
 * A duet including a function and a list of parameters to make accomplished the on-event emitted function.
 */
export type ServiceFunctionPackage = [(...arg: any[]) => any | Promise<any>, any[]];

/**
 * The type representing the list of methods called on an event triggered moment.
 */
export type OnEventEmittedMethods = Partial<Record<ClientEventsKey, ServiceFunctionPackage[]>>;

/**
 * The default value for the 'event ready' function.
 */
export const defaultOnEventEmittedMethods: OnEventEmittedMethods = {
  ready: [[(client: HashiClient): void => client.logger.info('Unknown service online.'), []]],
};

/**
 * The class that represents a service.
 */
export class Service<
  ServiceDataStructure extends DataMapDefinition<SchemaDefinition> = DataMapDefinition<SchemaDefinition>,
> extends Base {
  /**
   * The name of the service.
   */
  readonly #name: string;

  /**
   * The list of methods called when a precise event is executed.
   */
  readonly #onEmitted: OnEventEmittedMethods = defaultOnEventEmittedMethods;

  /**
   * The data map name associated with the service.
   */
  readonly #dataMapName: string;

  /**
   * The version of the service.
   */
  readonly #version: string = '0.0.0';

  /**
   * The name of the service.
   * @returns The name of the service.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * The list of methods called when a precise event is executed.
   * @returns The list of methods.
   */
  get onEmitted(): OnEventEmittedMethods {
    return this.#onEmitted;
  }

  /**
   * The data map name associated with the service.
   * @returns The data map name.
   */
  get dataMapName(): string {
    return this.#dataMapName;
  }

  /**
   * The version of the service.
   * @returns The version of the service.
   */
  get version(): string {
    return this.#version;
  }

  /**
   * The constructor of the class. You can pass here the attributes and the functions you need.
   * @param client The client instance.
   * @param name The name of the service.
   * @param dataMapName The name of the data map.
   * @param serviceDataStructure The data object structure to set. Extends the DataMapDefinition.
   */
  constructor(
    client: HashiClient,
    name: string,
    dataMapName: string,
    serviceDataStructure: ServiceDataStructure = null,
  ) {
    super(client);
    this.#name = name;

    this.client.databaseManager.ensure(dataMapName, true);
    const dataMap: DataMap<TypedDataMapStored> = this.dataMap;
    dataMap.setDefinition(serviceDataStructure);
  }

  /**
   * Returns the linked data map.
   * @returns The data map.
   */
  get dataMap(): DataMap<TypedDataMapStored> {
    return this.client.databaseManager.ensure(this.dataMapName, true);
  }

  /**
   * Add a new function to an event if the event has to be executed.
   * @param eventName The name of the event to bind to.
   * @param funcPackage The code of the function with his parameters.
   */
  public link(eventName: ClientEventsKey, funcPackage: ServiceFunctionPackage): Service {
    if (this.onEmitted[eventName]) this.onEmitted[eventName].push(funcPackage);
    else this.onEmitted[eventName] = [funcPackage];

    return this;
  }
}
