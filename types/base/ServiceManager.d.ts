import { HashiClient } from '../root/';
import { Service } from './Service';
import { AutomaticRoleInstance } from '../services';
import { Base } from './Base';
/**
 * The object of all the services.
 */
export interface ServicesMap {
    [serviceName: string]: Service;
    /**
     * The class that includes all the required tools to create an automatic role system.
     */
    AutomaticRole: AutomaticRoleInstance;
}
/**
 * A key for the service map.
 */
export type ServicesMapKey = keyof ServicesMap;
/**
 * A value for the service map.
 */
export type ServicesMapValue = ServicesMap[ServicesMapKey];
/**
 * The class including the services and sync them.
 */
export declare class ServiceManager extends Base {
    #private;
    /**
     * Get the services.
     * @returns The services.
     */
    get services(): ServicesMap;
    /**
     * The constructor of the command manager.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Create a new instance of a service. Methods and attributes initializing possible.
     * @param serviceName The name of the service.
     * @param dataMapName The name of the data map.
     * @returns A service instance.
     */
    create(serviceName: string, dataMapName: string): Service;
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
