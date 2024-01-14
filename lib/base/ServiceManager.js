"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManager = void 0;
const Service_1 = require("./Service");
const services_1 = require("../services");
const Base_1 = require("./Base");
const FileManager_1 = require("../root/FileManager");
/**
 * The class including the services and sync them.
 */
class ServiceManager extends Base_1.Base {
    /**
     * The list of services.
     */
    #services = {
        /**
         * The class that includes all the required tools to create an automatic role system.
         */
        AutomaticRole: null,
    };
    /**
     * Get the services.
     * @returns The services.
     */
    get services() {
        return this.#services;
    }
    /**
     * The constructor of the command manager.
     * @param client The client instance.
     */
    constructor(client) {
        super(client);
    }
    /**
     * Create a new instance of a service.
     * @param serviceName The name of the service.
     * @param dataMapName The name of the data map.
     * @returns A service instance.
     */
    create(serviceName, dataMapName) {
        const service = new Service_1.Service(this.client, '0.1.0-experimental', serviceName, dataMapName);
        this.#services[serviceName] = service;
        return service;
    }
    /**
     * Link an instance of Service.
     * @param service The service to link.
     * @returns A service instance.
     */
    bindService(service) {
        this.#services[service.name] = service;
        return service;
    }
    /**
     * Synchronize the services created by the coder into their own repository.
     * @returns The class instance.
     */
    loadServices() {
        const serviceFiles = this.client.fileManager.read(`${FileManager_1.FileManager.ABSPATH}${this.client.servicesDir}`, `${FileManager_1.FileManager.RMPATH}${this.client.servicesDir}`, {
            absPathStrSelf: `./lib/${this.client.servicesDir}`,
            rmPathStrSelf: `../${this.client.servicesDir}`,
        });
        let i = -1;
        while (++i < serviceFiles.length)
            this.bindService(serviceFiles[i][1][serviceFiles[i][0]]);
        return this;
    }
    /**
     * Enable a predefined service.
     * @param serviceNames The name of the service to enable.
     * @returns The service instance.
     */
    enable(...serviceNames) {
        let i = -1;
        let serviceName;
        while (++i < serviceNames.length) {
            serviceName = serviceNames[i];
            switch (serviceName) {
                case 'AutomaticRole':
                    this.services.AutomaticRole = new services_1.Classes.AutomaticRole(this.client);
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
    launchLinkedEvents() {
        let clientEventsList = [];
        let i = -1;
        let j = -1;
        let serviceKey;
        let service;
        let eventKey;
        while (++i < Object.keys(this.services).length) {
            serviceKey = Object.keys(this.services)[i];
            service = this.services[serviceKey];
            while (++j < Object.keys(service.onEmitted).length) {
                eventKey = Object.keys(service.onEmitted)[j];
                if (!clientEventsList.includes(eventKey))
                    clientEventsList.push(eventKey);
            }
            j = -1;
        }
        i = -1;
        let k = -1;
        while (++i < clientEventsList.length) {
            eventKey = clientEventsList[i];
            while (++j < Object.keys(this.services).length) {
                serviceKey = Object.keys(this.services)[j];
                service = this.services[serviceKey];
                this.client[eventKey === 'ready' ? 'once' : 'on'](eventKey, (...args) => {
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
exports.ServiceManager = ServiceManager;
