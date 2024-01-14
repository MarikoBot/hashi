"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMap = exports.DATAMAP_INTENTS = void 0;
const mongoose_1 = require("mongoose");
const root_1 = require("../root/");
const Base_1 = require("./Base");
/**
 * The list of flags for the data map intents.
 */
var DATAMAP_INTENTS;
(function (DATAMAP_INTENTS) {
    /**
     * If the data map is used for store the most important data (as process data).
     */
    DATAMAP_INTENTS[DATAMAP_INTENTS["CORE"] = 0] = "CORE";
})(DATAMAP_INTENTS || (exports.DATAMAP_INTENTS = DATAMAP_INTENTS = {}));
/**
 * The main class. Represents a data map technology.
 */
class DataMap extends Base_1.Base {
    /**
     * The name of the data map.
     */
    #name = 'default';
    /**
     * The entry class to use while using the data.
     */
    #entryClass;
    /**
     * The primary key(s). Separate it with a '+' sign.
     */
    #primaryKey = 'discordId';
    /**
     * The default data for the data map.
     */
    #definition = {
        name: 'unnamedMap',
        entry: (root_1.DataMapEntry),
        schema: new mongoose_1.Schema({ discordId: { type: String } }),
        defaultValues: {
            id: Date.now().toString(),
        },
    };
    /**
     * Intents for the database. Be careful! Those intents MUST BE set before the launch of the process.
     */
    #intents = [];
    /**
     * The collection/model of the schema.
     */
    #model;
    /**
     * Get the data map name.
     * @returns The name.
     */
    get name() {
        return this.#name;
    }
    /**
     * Get the entry class.
     * @returns The entry class.
     */
    get entryClass() {
        return this.#entryClass;
    }
    /**
     * Get the primary key.
     * @returns The primary key.
     */
    get primaryKey() {
        return this.#primaryKey;
    }
    /**
     * Get the default data.
     * @returns The default data.
     */
    get definition() {
        return this.#definition;
    }
    /**
     * Get the intents.
     * @returns The intents.
     */
    get intents() {
        return this.#intents;
    }
    /**
     * Get the data map.
     * @returns The data map.
     */
    get model() {
        return this.#model;
    }
    /**
     * The constructor of a data map.
     * @param client The client instance.
     * @param name The name of the collection.
     * @param entryClass The entry class.
     */
    constructor(client, name, entryClass = (root_1.DataMapEntry)) {
        super(client);
        this.#name = name;
        this.#entryClass = entryClass;
    }
    /**
     * Set the data map name.
     * @param name The data map name to set.
     * @returns The class instance.
     */
    setName(name) {
        if (typeof name === 'string')
            this.#name = name;
        return this;
    }
    /**
     * Set the entry class.
     * @param entryClass the entry class to set.
     * @returns The class instance.
     */
    setEntryClass(entryClass) {
        if (typeof entryClass === 'object')
            this.#entryClass = entryClass;
        return this;
    }
    /**
     * Set the primary key.
     * @param primaryKey The primary key to set.
     * @returns The class instance.
     */
    setPrimaryKey(primaryKey) {
        if (typeof primaryKey === 'string')
            this.#primaryKey = primaryKey;
        return this;
    }
    /**
     * Set the definition data.
     * @param definition The definition data to set.
     * @returns The data map.
     */
    setDefinition(definition) {
        if (typeof definition === 'object' && definition !== null) {
            this.#definition = definition;
            this.#model = definition.model;
        }
        return this;
    }
    /**
     * Add an intent.
     * @param intent The intent to add.
     * @returns The data map.
     */
    addIntent(intent) {
        if (intent === DATAMAP_INTENTS.CORE)
            this.#intents.push(intent);
        return this;
    }
    /**
     * Display all the data included into the collection.
     * @returns The retrieved data.
     */
    async content() {
        console.log(this.model);
        const documents = await this.model.find({});
        return documents;
    }
    /**
     * Get some data from the data map.
     * @param key The key to look for.
     * @returns The data if found.
     */
    async getRaw(key = this.definition.defaultValues[this.primaryKey]) {
        let value = null;
        return value;
    }
    /**
     * Automatically refreshes the data map if the data is core flagged.
     * @returns Nothing.
     */
    async refreshCore() {
        if (!this.intents.includes(DATAMAP_INTENTS.CORE))
            return;
        const currentData = await this.getRaw(this.definition.defaultValues[this.primaryKey]);
    }
    /**
     * Update some data from the database.
     * @param key The key to look.
     * @param data The full data.
     * @param path The path if the data is SQLite.
     * @returns Nothing.
     */
    async update(key = this.definition.defaultValues[this.primaryKey], data, path) { }
    /**
     * Refresh the data in the database if the structure is detected to be different.
     * @param key The key to look who applies changes on.
     * @returns The player data.
     */
    async get(key = this.definition.defaultValues[this.primaryKey]) {
        const data = await this.getRaw(key);
        if (!data)
            return data;
        const structure = this.definition.defaultValues;
        let finalStructure;
        let refreshIsRequired = false;
        const compareObj = (source, target, finalObj) => {
            for (const K of Object.keys(source)) {
                if (this.primaryKey.includes(K)) {
                    finalObj[K] = target[K];
                    continue;
                }
                if (typeof source[K] !== 'object') {
                    finalObj[K] = typeof source[K] !== typeof target[K] ? source[K] : target[K];
                }
                else {
                    if (K in target)
                        finalObj[K] = compareObj(source[K], target[K], {});
                    else {
                        if (typeof finalObj[K] !== 'object')
                            refreshIsRequired = true;
                        finalObj = source[K];
                    }
                }
            }
            return finalObj;
        };
        finalStructure = compareObj(structure, data, {});
        if (refreshIsRequired)
            await this.update(key, finalStructure);
        return new this.entryClass(this, finalStructure);
    }
}
exports.DataMap = DataMap;
