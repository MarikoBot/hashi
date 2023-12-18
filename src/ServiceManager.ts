// noinspection JSUnusedGlobalSymbols

import { HashiClient } from './HashiClient';
import {
  ClientEventsKey,
  Service,
  ServiceFunctionPackage,
  ServicePublicAttributesRecord,
  ServicePublicMethodsRecord,
  ServiceTypesBase,
} from './services/Service';
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
export class ServiceManager {
  /**
   * The client instance.
   */
  public readonly client: HashiClient;

  /**
   * The list of services.
   */
  #services: ServicesMap = {
    /**
     * The class that includes all the required tools to create an automatic role system.
     */
    AutomaticRole: null,
  };

  /**
   * Get the services.
   * @returns The services.
   */
  get services(): ServicesMap {
    return this.#services;
  }

  /**
   * The constructor of the command manager.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    this.client = client;
  }

  /**
   * Create a new instance of a service. Methods and attributes initializing possible.
   * @param serviceName The name of the service.
   * @param dataMapName The name of the data map.
   * @param methods The list of methods for the class.
   * @param attributes The list of attributes for the class.
   * @returns A service instance.
   */
  public create<CreationTypes extends ServiceTypesBase>(
    serviceName: string,
    dataMapName: string,
    methods: ServicePublicMethodsRecord<CreationTypes> = {},
    attributes: ServicePublicAttributesRecord<CreationTypes> = {},
  ): Service<CreationTypes> {
    const service: Service<CreationTypes> = new Service<CreationTypes>(
      this.client,
      serviceName,
      dataMapName,
      methods,
      attributes,
    );
    this.#services[serviceName] = service;

    return service;
  }

  /**
   * Enable a predefined service.
   * @param serviceName The name of the service to enable.
   * @returns The service instance.
   */
  public enable(serviceName: ServicesMapKey): ServicesMapValue {
    switch (serviceName) {
      case 'AutomaticRole':
        this.services.AutomaticRole = new AutomaticRoleInstance(this.client);
        return this.services.AutomaticRole;
      default:
        return null;
    }
  }

  /**
   * Launches the different event with the associated functions.
   * @returns Nothing.
   */
  public launchLinkedEvents(): void {
    let functionPackages: Record<ClientEventsKey, ServiceFunctionPackage[]>;
    const serviceKeys: string[] = Object.keys(this.services);

    let i: number = -1;
    let j: number = -1;
    let serviceKey: string;
    let service: Service<ServiceTypesBase>;

    while (++i < serviceKeys.length) {
      serviceKey = serviceKeys[i];
      service = this.services[serviceKey];
    }
  }
}
