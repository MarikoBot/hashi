"use strict";
// noinspection JSUnusedGlobalSymbols
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOnEventEmittedMethods = exports.Service = void 0;
const _1 = require("./");
const decorators_1 = require("../decorators");
/**
 * The class that represents a service.
 */
class Service extends _1.BaseClient {
    /**
     * The name of the service.
     */
    name;
    /**
     * The list of methods called when a precise event is executed.
     */
    onEmitted = exports.defaultOnEventEmittedMethods;
    /**
     * The data map name associated with the service.
     */
    dataMapName;
    /**
     * The version of the service.
     */
    version = '0.1.0';
    /**
     * The object including all the resources of the service.
     */
    resources;
    /**
     * The constructor of the class. You can pass here the attributes and the functions you need.
     * @param client The client instance.
     * @param name The name of the service.
     * @param version The version of the service.
     * @param dataMapName The name of the data map.
     */
    constructor(client, name, version, dataMapName) {
        super(client);
        this.name = name;
        this.version = version || '0.1.0';
        this.dataMapName = dataMapName;
        this.client.databaseManager.ensure(this.dataMapName, true);
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
__decorate([
    decorators_1.Validators.StringValidator.ValidId
], Service.prototype, "name", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.KeyFunctionPair
], Service.prototype, "onEmitted", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidId
], Service.prototype, "dataMapName", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidVersion
], Service.prototype, "version", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.KeyObjectPair
], Service.prototype, "resources", void 0);
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
