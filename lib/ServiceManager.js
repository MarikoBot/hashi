"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManager = void 0;
const Service_1 = require("./Service");
const services_1 = require("./services");
/**
 * The class including the services and sync them.
 */
class ServiceManager {
    /**
     * The client instance.
     */
    #client;
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
     * Get the client instance.
     * @returns The client instance.
     */
    get client() {
        return this.#client;
    }
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
        this.#client = client;
    }
    /**
     * Create a new instance of a service. Methods and attributes initializing possible.
     * @param serviceName The name of the service.
     * @param dataMapName The name of the data map.
     * @returns A service instance.
     */
    create(serviceName, dataMapName) {
        const service = new Service_1.Service(this.client, serviceName, dataMapName);
        this.#services[serviceName] = service;
        return service;
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
                    this.services.AutomaticRole = new services_1.AutomaticRoleInstance(this.client);
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
        let functionPackages;
        const serviceKeys = Object.keys(this.services);
        let i = -1;
        let j = -1;
        let serviceKey;
        let service;
        while (++i < serviceKeys.length) {
            serviceKey = serviceKeys[i];
            service = this.services[serviceKey];
        }
    }
}
exports.ServiceManager = ServiceManager;
