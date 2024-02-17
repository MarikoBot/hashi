// noinspection JSUnusedGlobalSymbols

import { ClientEvents } from 'discord.js';
import { SchemaDefinition } from 'mongoose';
import { BaseClient, DataMap, DataMapDefinition, TypedDataMapStored } from './';
import { Validators } from '../decorators';
import { HashiClient } from '../root/';

/**
 * The class that represents a service.
 */
export class Service<
  ServiceDataStructure extends DataMapDefinition<SchemaDefinition> = DataMapDefinition<SchemaDefinition>,
> extends BaseClient {
  /**
   * The name of the service.
   */
  @Validators.StringValidator.ValidId
  public readonly name: string;

  /**
   * The list of methods called when a precise event is executed.
   */
  @Validators.ObjectValidator.KeyFunctionPair
  public readonly onEmitted: OnEventEmittedMethods = defaultOnEventEmittedMethods;

  /**
   * The data map name associated with the service.
   */
  @Validators.StringValidator.ValidId
  public readonly dataMapName: string;

  /**
   * The version of the service.
   */
  @Validators.StringValidator.ValidVersion
  public readonly version: string = '0.1.0';

  /**
   * The object including all the resources of the service.
   */
  @Validators.ObjectValidator.KeyObjectPair
  public resources: ServiceResources;

  /**
   * The constructor of the class. You can pass here the attributes and the functions you need.
   * @param client The client instance.
   * @param name The name of the service.
   * @param version The version of the service.
   * @param dataMapName The name of the data map.
   */
  constructor(client: HashiClient, name: string, version: string, dataMapName: string) {
    super(client);
    this.name = name;
    this.version = version || '0.1.0';
    this.dataMapName = dataMapName;

    this.client.databaseManager.ensure(this.dataMapName, true);
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

/**
 * The default value for the 'event ready' function.
 */
export const defaultOnEventEmittedMethods: OnEventEmittedMethods = {
  ready: [
    [
      (service: Service): void => {
        return service.client.logger.info(`Service ${service.name} v${service.version} ready.`);
      },
      [],
    ],
  ],
};

/**
 * The type representing the key name of an event.
 */
export type ClientEventsKey = keyof ClientEvents;

/**
 * The type representing the list of methods called on an event triggered moment.
 */
export type OnEventEmittedMethods = Partial<Record<ClientEventsKey, ServiceFunctionPackage[]>>;

/**
 * A duet including a function and a list of parameters to make accomplished the on-event emitted function.
 */
export type ServiceFunctionPackage = [(service: Service, ...arg: any[]) => any | Promise<any>, any[]];

/**
 * The type that represents an object with all the resources of the service.
 */
export type ServiceResources = { [resourceName: string]: ServiceResources | any };
