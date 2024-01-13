// noinspection JSUnusedGlobalSymbols

import { HashiClient } from './HashiClient';
import { ClientEventsKey, OnEventEmittedMethods, Service, ServiceFunctionPackage } from './Service';
import { AutomaticRoleInstance } from './services';

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
export class ServiceManager {
  /**
   * The client instance.
   */
  readonly #client: HashiClient;

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
   * Get the client instance.
   * @returns The client instance.
   */
  get client(): HashiClient {
    return this.#client;
  }

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
    this.#client = client;
  }

  /**
   * Create a new instance of a service. Methods and attributes initializing possible.
   * @param serviceName The name of the service.
   * @param dataMapName The name of the data map.
   * @returns A service instance.
   */
  public create(serviceName: string, dataMapName: string): Service {
    const service: Service = new Service(this.client, serviceName, dataMapName);
    this.#services[serviceName] = service;

    return service;
  }

  /**
   * Enable a predefined service.
   * @param serviceNames The name of the service to enable.
   * @returns The service instance.
   */
  public enable(...serviceNames: ServicesMapKey[]): ServicesMapValue {
    let i: number = -1;
    let serviceName: ServicesMapKey;

    while (++i < serviceNames.length) {
      serviceName = serviceNames[i];

      switch (serviceName) {
        case 'AutomaticRole':
          this.services.AutomaticRole = new AutomaticRoleInstance(this.client);
          return this.services.AutomaticRole;
        default:
          return null;
      }
    }
  }

  /**
   * Launches the different event with the associated functions.
   * @returns Nothing.
   */
  public launchLinkedEvents(): void {
    let clientEventsList: ClientEventsKey[];

    let i: number = -1;
    let j: number = -1;

    let serviceKey: string;
    let service: Service;
    let eventKey: ClientEventsKey;

    while (++i < Object.keys(this.services).length) {
      serviceKey = Object.keys(this.services)[i];
      service = this.services[serviceKey];

      while (++j < Object.keys(service.onEmitted).length) {
        eventKey = <ClientEventsKey>Object.keys(service.onEmitted)[j];
        if (!clientEventsList.includes(eventKey)) clientEventsList.push(eventKey);
      }

      j = -1;
    }
    i = -1;

    let k: number = -1;
    while (++i < clientEventsList.length) {
      eventKey = clientEventsList[i];

      while (++j < Object.keys(this.services).length) {
        serviceKey = Object.keys(this.services)[j];
        service = this.services[serviceKey];

        this.client[eventKey === 'ready' ? 'once' : 'on'](eventKey, (...args: any[]): void => {
          while (++k < service.onEmitted[eventKey].length)
            service.onEmitted[eventKey][k][0](service, ...service.onEmitted[eventKey][k][1]);
          k = -1;
        });
      }
      j = -1;
    }

    return;
  }
}
