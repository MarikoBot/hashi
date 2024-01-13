"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.defaultOnEventEmittedMethods = void 0;
const Base_1 = require("./Base");
/**
 * The default value for the 'event ready' function.
 */
exports.defaultOnEventEmittedMethods = {
    ready: [[(client) => client.logger.info('Unknown service online.'), []]],
};
/**
 * The class that represents a service.
 */
class Service extends Base_1.Base {
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
    #version = '0.0.0';
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
     * The constructor of the class. You can pass here the attributes and the functions you need.
     * @param client The client instance.
     * @param name The name of the service.
     * @param dataMapName The name of the data map.
     * @param serviceDataStructure The data object structure to set. Extends the DataMapDefinition.
     */
    constructor(client, name, dataMapName, serviceDataStructure = null) {
        super(client);
        this.#name = name;
        this.client.databaseManager.ensure(dataMapName, true);
        const dataMap = this.dataMap;
        dataMap.setDefinition(serviceDataStructure);
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
