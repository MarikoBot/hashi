import { HashiClient } from './HashiClient';
import { Service, ServicePublicAttributesRecord, ServicePublicMethodsRecord, ServiceTypesBase } from './services/Service';
import { AutomaticRoleInstance } from './services';
/**
 * The object of all the services.
 */
export interface ServicesMap {
    [serviceName: string]: Service<ServiceTypesBase>;
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
export declare class ServiceManager {
    #private;
    /**
     * Get the client instance.
     * @returns The client instance.
     */
    get client(): HashiClient;
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
     * @param methods The list of methods for the class.
     * @param attributes The list of attributes for the class.
     * @returns A service instance.
     */
    create<CreationTypes extends ServiceTypesBase>(serviceName: string, dataMapName: string, methods?: ServicePublicMethodsRecord<CreationTypes>, attributes?: ServicePublicAttributesRecord<CreationTypes>): Service<CreationTypes>;
    /**
     * Enable a predefined service.
     * @param serviceName The name of the service to enable.
     * @returns The service instance.
     */
    enable(serviceName: ServicesMapKey): ServicesMapValue;
    /**
     * Launches the different event with the associated functions.
     * @returns Nothing.
     */
    launchLinkedEvents(): void;
}
