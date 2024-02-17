"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const discord_js_1 = require("discord.js");
const _1 = require("./");
const decorators_1 = require("../decorators");
const root_1 = require("../root/");
/**
 * Represents the event manager for the client service.
 */
class EventManager extends _1.BaseClient {
    /**
     * The collection of the events.
     */
    eventsList = new discord_js_1.Collection();
    /**
     * The constructor of the event manager.
     * @param client The client instance.
     */
    constructor(client) {
        super(client);
    }
    /**
     * Load the commands from the given events directory.
     * @returns Nothing.
     */
    async loadEvents() {
        const eventFiles = this.client.fileManager.read(`${root_1.FileManager.ABSPATH}${this.client.eventsDir}`, `${root_1.FileManager.RMPATH}${this.client.eventsDir}`, {
            absPathStrSelf: `./lib/${this.client.eventsDir}`,
            rmPathStrSelf: `../${this.client.eventsDir}`,
        });
        const events = [];
        let eventData;
        let i = -1;
        while (++i < eventFiles.length) {
            eventData = eventFiles[i][1][eventFiles[i][0]];
            this.client.eventManager.eventsList.set(eventData.name, eventData);
            events.push(eventData);
        }
        i = -1;
        while (++i < events.length) {
            eventData = events[i];
            eventData.client = this.client;
            this.client.src[eventData.name === 'ready' ? 'once' : 'on'](eventData.name, (...args) => eventData.callback(this.client, ...args));
        }
    }
}
exports.EventManager = EventManager;
__decorate([
    decorators_1.Validators.ObjectValidator.IsInstanceOf(discord_js_1.Collection)
], EventManager.prototype, "eventsList", void 0);
