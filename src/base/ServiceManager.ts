// noinspection JSUnusedGlobalSymbols

import { Base, Service, ClientEventsKey } from './';
import { Validators } from '../decorators';
import { FileManager, HashiClient } from '../root/';
import { Classes } from '../services';

/**
 * The class including the services and sync them.
 */
export class ServiceManager extends Base {
  /**
   * The list of services.
   */
  @Validators.ObjectValidator.KeyServicePair
  public services: ServicesMap = {
    /**
     * The class that includes all the required tools to create an automatic role system.
     */
    AutomaticRole: null,
  };

  /**
   * The constructor of the command manager.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    super(client);
  }

  /**
   * Create a new instance of a service.
   * @param serviceName The name of the service.
   * @param dataMapName The name of the data map.
   * @returns A service instance.
   */
  public create(serviceName: string, dataMapName: string): Service {
    const service: Service = new Service(this.client, '0.1.0-experimental', serviceName, dataMapName);
    this.services[serviceName] = service;

    return service;
  }

  /**
   * Link an instance of Service.
   * @param service The service to link.
   * @returns A service instance.
   */
  public bindService(service: Service): Service {
    this.services[service.name] = service;
    return service;
  }

  /**
   * Synchronize the services created by the coder into their own repository.
   * @returns The class instance.
   */
  public loadServices(): ServiceManager {
    const serviceFiles: [string, typeof Service][] = this.client.fileManager.read<typeof Service>(
      `${FileManager.ABSPATH}${this.client.servicesDir}`,
      `${FileManager.RMPATH}${this.client.servicesDir}`,
      {
        absPathStrSelf: `./lib/${this.client.servicesDir}`,
        rmPathStrSelf: `../${this.client.servicesDir}`,
      },
    );

    let i: number = -1;
    while (++i < serviceFiles.length) this.bindService(new serviceFiles[i][1][serviceFiles[i][0]](this.client));

    return this;
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
          this.services.AutomaticRole = new Classes.AutomaticRole(this.client);
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
    let clientEventsList: ClientEventsKey[] = [];

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

        this.client.src[eventKey === 'ready' ? 'once' : 'on'](eventKey, (...args: any[]): void => {
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
