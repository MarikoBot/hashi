// noinspection JSUnusedGlobalSymbols

import { HashiClient } from '../HashiClient';
import { ClientEvents } from 'discord.js';
import { DataMap, DataMapDefinition, TypedDataMapStored } from '../DataMap';
import { SchemaDefinition } from 'mongoose';

/**
 * A function included in the service instance.
 */
export type ServiceNativeMethod<ReturnType> = (...args: any[]) => ReturnType | Promise<ReturnType>;

/**
 * A function included in the service instance.
 */
export type ServiceNativeAttribute<ReturnType> = ReturnType;

/**
 * The type included in the services ; the possible types returned by a class method.
 */
export type ServiceTypesBase = any[] | undefined;

/**
 * The type representing the key name of an event.
 */
export type ClientEventsKey = keyof ClientEvents;

/**
 * The type representing the list of methods called on an event triggered moment.
 */
export type OnEventEmittedMethods = Record<ClientEventsKey, [ServiceFunctionPackage]>;

/**
 * The type representing the list of methods for the service class instance.
 */
export type ServicePublicMethodsRecord<Types extends ServiceTypesBase> = {
  [methodName: string]: ServiceNativeMethod<Types[number]>;
};

/**
 * The type representing the list of methods for the service class instance.
 */
export type ServiceNativeManagementMethod<Types extends ServiceTypesBase> = (...arg: any[]) => Service<Types>;

/**
 * The type representing the list of attributes for the service class instance.
 */
export type ServicePublicAttributesRecord<Types extends ServiceTypesBase> = {
  [methodName: string]: ServiceNativeAttribute<Types[number]>;
};

/**
 * The type representing the list of private attributes for the service class instance.
 * These attributes are here in a management purpose.
 */
export interface ServiceManagementPrivateAttributes {
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The data map name associated with the service.
   */
  dataMapName: string;
}

/**
 * The type representing the list of private methods for the service class instance.
 * These attributes are here in a management purpose.
 */
export interface ServiceManagementMethods {}

/**
 * A duet including a function and a list of parameters to make accomplished the on-event emitted function.
 */
export type ServiceFunctionPackage = [(...arg: any[]) => any | Promise<any>, any[]];

/**
 * The class that represents a service.
 */
export class Service<
  Types extends ServiceTypesBase,
  ServiceDataStructure extends DataMapDefinition<SchemaDefinition> = DataMapDefinition<SchemaDefinition>,
> {
  [instanceSubstitute: string]:
    | HashiClient
    | ServicePublicMethodsRecord<Types>
    | ServicePublicAttributesRecord<Types>
    | ServiceNativeManagementMethod<Types>
    | ServiceManagementPrivateAttributes
    | ServiceManagementMethods;

  /**
   * The client instance.
   */
  public readonly client: HashiClient;

  /**
   * The list of methods of the service. The user of the package can add them.
   */
  public m: ServicePublicMethodsRecord<Types> = {};

  /**
   * The list of attributes of the service. The user of the package can add them.
   */
  public a: ServicePublicAttributesRecord<Types> = {};

  /**
   * The list of methods called when a precise event is executed.
   */
  public o: OnEventEmittedMethods;

  /**
   * The list of attributes of the service. Management purpose.
   */
  private readonly prv: ServiceManagementPrivateAttributes = {
    /**
     * The name of the service.
     */
    name: `service${Date.now()}`,
    /**
     * The data map name associated with the service.
     */
    dataMapName: 'default',
  };

  /**
   * The constructor of the class. You can pass here the attributes and the functions you need.
   * @param client The client instance.
   * @param name The name of the service.
   * @param dataMapName The name of the data map.
   * @param methods The list of methods for the class.
   * @param attributes The list of attributes for the class.
   * @param serviceDataStructure The data object structure to set.
   */
  constructor(
    client: HashiClient,
    name: string,
    dataMapName: string,
    methods: ServicePublicMethodsRecord<Types> = {},
    attributes: ServicePublicAttributesRecord<Types> = {},
    serviceDataStructure: ServiceDataStructure = null,
  ) {
    this.client = client;
    this.prv.name = name;
    this.prv.dataMapName = dataMapName;
    this.m = methods;
    this.a = attributes;

    const dataMap: DataMap<TypedDataMapStored> = this.dataMap;
    dataMap.setDefinition(serviceDataStructure);
  }

  /**
   * Returns the linked data map.
   * @returns The data map.
   */
  get dataMap(): DataMap<TypedDataMapStored> {
    return this.client.databaseManager.ensure(this.prv.dataMapName, true);
  }

  /**
   * Add a new function to an event if the event has to be executed.
   * @param eventName The name of the event to bind to.
   * @param funcPackage The code of the function with his parameters.
   */
  public link(eventName: ClientEventsKey, funcPackage: ServiceFunctionPackage): Service<Types> {
    if (typeof eventName === 'string') {
      if (this.o[eventName]) this.o[eventName].push(funcPackage);
      else this.o[eventName] = [funcPackage];
    }
    return this;
  }
}
