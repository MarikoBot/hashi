"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOnEventEmittedMethods = exports.Service = void 0;
const _1 = require("./");
/**
 * The class that represents a service.
 */
class Service extends _1.Base {
    /**
     * The name of the service.
     */
    #name;
    /**
     * The list of methods called when a precise event is executed.
     */
    #onEmitted = exports.defaultOnEventEmittedMethods;
    /**
     * The data map name associated with the service.
     */
    #dataMapName;
    /**
     * The version of the service.
     */
    #version = '0.1.0';
    /**
     * The object including all the resources of the service.
     */
    #resources;
    /**
     * The name of the service.
     * @returns The name of the service.
     */
    get name() {
        return this.#name;
    }
    /**
     * The list of methods called when a precise event is executed.
     * @returns The list of methods.
     */
    get onEmitted() {
        return this.#onEmitted;
    }
    /**
     * The data map name associated with the service.
     * @returns The data map name.
     */
    get dataMapName() {
        return this.#dataMapName;
    }
    /**
     * The version of the service.
     * @returns The version of the service.
     */
    get version() {
        return this.#version;
    }
    /**
     * The resources for the service.
     * @returns The resources.
     */
    get resources() {
        return this.#resources;
    }
    /**
     * The constructor of the class. You can pass here the attributes and the functions you need.
     * @param client The client instance.
     * @param name The name of the service.
     * @param version The version of the service.
     * @param dataMapName The name of the data map.
     */
    constructor(client, name, version, dataMapName) {
        super(client);
        this.#name = name;
        this.#version = version || '0.1.0';
        this.#dataMapName = dataMapName;
        this.client.databaseManager.ensure(this.#dataMapName, true);
    }
    /**
     * Set the resources with all the objects/classes linked to the service.
     * Regroup all in this property.
     * @param resources The resources object.
     * @returns The class instance.
     */
    setResources(resources) {
        this.#resources = resources;
        return this;
    }
    /**
     * Returns the linked data map.
     * @returns The data map.
     */
    get dataMap() {
        return this.client.databaseManager.ensure(this.dataMapName, true);
    }
    /**
     * Add a new function to an event if the event has to be executed.
     * @param eventName The name of the event to bind to.
     * @param funcPackage The code of the function with his parameters.
     */
    link(eventName, funcPackage) {
        if (this.onEmitted[eventName])
            this.onEmitted[eventName].push(funcPackage);
        else
            this.onEmitted[eventName] = [funcPackage];
        return this;
    }
}
exports.Service = Service;
/**
 * The default value for the 'event ready' function.
 */
exports.defaultOnEventEmittedMethods = {
    ready: [
        [
            (service) => {
                return service.client.logger.info(`Service ${service.name} v${service.version} ready.`);
            },
            [],
        ],
    ],
};
