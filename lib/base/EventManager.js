"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const discord_js_1 = require("discord.js");
const Base_1 = require("./Base");
const FileManager_1 = require("../root/FileManager");
/**
 * Represents the event manager for the client service.
 */
class EventManager extends Base_1.Base {
    /**
     * The collection of the events.
     */
    #eventsList = new discord_js_1.Collection();
    /**
     * Get the events list.
     * @returns The events list.
     */
    get eventsList() {
        return this.#eventsList;
    }
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
        const eventFiles = this.client.fileManager.read(`${FileManager_1.FileManager.ABSPATH}${this.client.eventsDir}`, `${FileManager_1.FileManager.RMPATH}${this.client.eventsDir}`, {
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
            eventData.setClient(this.client);
            this.client.src[eventData.name === 'ready' ? 'once' : 'on'](eventData.name, (...args) => eventData.callback(this.client, ...args));
        }
    }
}
exports.EventManager = EventManager;
