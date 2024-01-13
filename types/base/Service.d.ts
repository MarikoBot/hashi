/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HashiClient } from '../root/';
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
export type ServiceFunctionPackage = [(service: Service, ...arg: any[]) => any | Promise<any>, any[]];
/**
 * The type representing the list of methods called on an event triggered moment.
 */
export type OnEventEmittedMethods = Partial<Record<ClientEventsKey, ServiceFunctionPackage[]>>;
/**
 * The default value for the 'event ready' function.
 */
export declare const defaultOnEventEmittedMethods: OnEventEmittedMethods;
/**
 * The type that represents an object with all the resources of the service.
 */
export type ServiceResources = {
    [resourceName: string]: ServiceResources | any;
};
/**
 * The class that represents a service.
 */
export declare class Service<ServiceDataStructure extends DataMapDefinition<SchemaDefinition> = DataMapDefinition<SchemaDefinition>> extends Base {
    #private;
    /**
     * The name of the service.
     * @returns The name of the service.
     */
    get name(): string;
    /**
     * The list of methods called when a precise event is executed.
     * @returns The list of methods.
     */
    get onEmitted(): OnEventEmittedMethods;
    /**
     * The data map name associated with the service.
     * @returns The data map name.
     */
    get dataMapName(): string;
    /**
     * The version of the service.
     * @returns The version of the service.
     */
    get version(): string;
    /**
     * The resources for the service.
     * @returns The resources.
     */
    get resources(): ServiceResources;
    /**
     * The constructor of the class. You can pass here the attributes and the functions you need.
     * @param client The client instance.
     * @param name The name of the service.
     * @param version The version of the service.
     * @param dataMapName The name of the data map.
     * @param serviceDataStructure The data object structure to set. Extends the DataMapDefinition.
     */
    constructor(client: HashiClient, name: string, version: string, dataMapName: string, serviceDataStructure?: ServiceDataStructure);
    /**
     * Set the resources with all the objects/classes linked to the service.
     * Regroup all in this property.
     * @param resources The resources object.
     * @returns The class instance.
     */
    setResources(resources: ServiceResources): Service;
    /**
     * Returns the linked data map.
     * @returns The data map.
     */
    get dataMap(): DataMap<TypedDataMapStored>;
    /**
     * Add a new function to an event if the event has to be executed.
     * @param eventName The name of the event to bind to.
     * @param funcPackage The code of the function with his parameters.
     */
    link(eventName: ClientEventsKey, funcPackage: ServiceFunctionPackage): Service;
}
