"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
/**
 * The class that represents a service.
 */
class Service {
    /**
     * The client instance.
     */
    client;
    /**
     * The list of methods of the service. The user of the package can add them.
     */
    m = {};
    /**
     * The list of attributes of the service. The user of the package can add them.
     */
    a = {};
    /**
     * The list of methods called when a precise event is executed.
     */
    o;
    /**
     * The list of attributes of the service. Management purpose.
     */
    prv = {
        /**
         * The name of the service.
         */
        name: `service${Date.now()}`,
        /**
         * The data map name associated with the service.
         */
        dataMapName: 'default',
    };
    /**
     * The constructor of the class. You can pass here the attributes and the functions you need.
     * @param client The client instance.
     * @param name The name of the service.
     * @param dataMapName The name of the data map.
     * @param methods The list of methods for the class.
     * @param attributes The list of attributes for the class.
     * @param serviceDataStructure The data object structure to set.
     */
    constructor(client, name, dataMapName, methods = {}, attributes = {}, serviceDataStructure = null) {
        this.client = client;
        this.prv.name = name;
        this.prv.dataMapName = dataMapName;
        this.m = methods;
        this.a = attributes;
        const dataMap = this.dataMap;
        dataMap.setDefinition(serviceDataStructure);
    }
    /**
     * Returns the linked data map.
     * @returns The data map.
     */
    get dataMap() {
        return this.client.DatabaseManager.ensure(this.prv.dataMapName, true);
    }
    /**
     * Add a new function to an event if the event has to be executed.
     * @param eventName The name of the event to bind to.
     * @param funcPackage The code of the function with his parameters.
     */
    link(eventName, funcPackage) {
        if (typeof eventName === 'string') {
            if (this.o[eventName])
                this.o[eventName].push(funcPackage);
            else
                this.o[eventName] = [funcPackage];
        }
        return this;
    }
}
exports.Service = Service;
