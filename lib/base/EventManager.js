"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const discord_js_1 = require("discord.js");
const fs = require("fs");
const path = require("path");
const Base_1 = require("./Base");
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
        const files = fs.readdirSync(`lib/${this.client.eventsDir}`);
        const events = [];
        let i = -1;
        let eventData;
        while (++i < files.length) {
            eventData = require(path.join(__dirname, `../../../../../lib/${this.client.eventsDir}/${files[i]}`));
            this.client.eventManager.eventsList.set(files[i].replace('.js', ''), eventData);
            events.push(eventData);
        }
        i = -1;
        eventData = null;
        while (++i < events.length) {
            eventData = events[i];
            eventData.setClient(this.client);
            this.client.src[eventData.name === 'ready' ? 'once' : 'on'](eventData.name, (...args) => eventData.callback(this.client, ...args));
        }
    }
}
exports.EventManager = EventManager;
