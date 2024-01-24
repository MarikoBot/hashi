import { Base, Service } from './';
import { HashiClient } from '../root/';
import { Classes } from '../services';
/**
 * The class including the services and sync them.
 */
export declare class ServiceManager extends Base {
    /**
     * The list of services.
     */
    services: ServicesMap;
    /**
     * The constructor of the command manager.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Create a new instance of a service.
     * @param serviceName The name of the service.
     * @param dataMapName The name of the data map.
     * @returns A service instance.
     */
    create(serviceName: string, dataMapName: string): Service;
    /**
     * Link an instance of Service.
     * @param service The service to link.
     * @returns A service instance.
     */
    bindService(service: Service): Service;
    /**
     * Synchronize the services created by the coder into their own repository.
     * @returns The class instance.
     */
    loadServices(): ServiceManager;
    /**
     * Enable a predefined service.
     * @param serviceNames The name of the service to enable.
     * @returns The service instance.
     */
    enable(...serviceNames: ServicesMapKey[]): ServicesMapValue;
    /**
     * Launches the different event with the associated functions.
     * @returns Nothing.
     */
    launchLinkedEvents(): void;
}
/**
 * The object of all the services.
 */
export interface ServicesMap {
    [serviceName: string]: Service;
    /**
     * The class that includes all the required tools to create an automatic role system.
     */
    AutomaticRole: Classes.AutomaticRole;
}
/**
 * A key for the service map.
 */
export type ServicesMapKey = keyof ServicesMap;
/**
 * A value for the service map.
 */
export type ServicesMapValue = ServicesMap[ServicesMapKey];
