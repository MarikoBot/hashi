"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMap = exports.DATAMAP_INTENTS = exports.DB_TECHNOLOGY = void 0;
const mongoose_1 = require("mongoose");
const HashiClient_1 = require("./HashiClient");
/**
 * The technology used for the data map.
 */
var DB_TECHNOLOGY;
(function (DB_TECHNOLOGY) {
    /**
     * If the used techno is SQLite (packages: better-sqlite3 + enmap).
     */
    DB_TECHNOLOGY[DB_TECHNOLOGY["SQLITE"] = 0] = "SQLITE";
    /**
     * If the used techno is MongoDB (packages: mongoose + mongodb).
     */
    DB_TECHNOLOGY[DB_TECHNOLOGY["MONGODB"] = 1] = "MONGODB";
})(DB_TECHNOLOGY || (exports.DB_TECHNOLOGY = DB_TECHNOLOGY = {}));
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
class DataMap {
    /**
     * The client instance.
     */
    #client;
    /**
     * The name of the data map.
     */
    #name = 'default';
    /**
     * The primary key(s). Separate it with a '+' sign.
     */
    #primaryKey = 'id';
    /**
     * The default data for the data map.
     */
    #definition = {
        schema: new mongoose_1.Schema({ id: { type: String } }),
        defaultValues: {
            id: Date.now().toString(),
        },
    };
    /**
     * Used technology.
     */
    #technology = DB_TECHNOLOGY.SQLITE;
    /**
     * Intents for the database. Be careful! Those intents MUST BE set before the launch of the process.
     */
    #intents = [];
    /**
     * The collection/model or the schema.
     */
    #collection;
    /**
     * Get the client.
     * @returns The client.
     */
    get client() {
        return this.#client;
    }
    /**
     * Get the data map name.
     * @returns The name.
     */
    get name() {
        return this.#name;
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
     * Get the technology.
     * @returns The technology.
     */
    get technology() {
        return this.#technology;
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
    get collection() {
        return this.#collection;
    }
    /**
     * Get the data map as enmap.
     * @returns The data map as enmap.
     */
    get enmap() {
        const data = this.collection;
        return data;
    }
    /**
     * Get the data map as mongo model.
     * @returns The data map as mongo model.
     */
    get model() {
        return this.definition.model;
    }
    /**
     * The constructor of a data map.
     * @param name The name of the collection.
     * @param technology The technology to use.
     */
    constructor(name, technology = DB_TECHNOLOGY.SQLITE) {
        this.#name = name;
        this.#technology = technology;
        console.log('3', name, technology);
        if (this.technology === DB_TECHNOLOGY.MONGODB) {
            this.#definition.model = (0, mongoose_1.model)(this.name, this.#definition.schema);
        }
        else if (this.technology === DB_TECHNOLOGY.SQLITE) {
            this.#collection = new (require('enmap'))({ name: this.name });
        }
    }
    /**
     * Set the client.
     * @param client The client to set.
     * @returns The class instance.
     */
    setClient(client) {
        if (client instanceof HashiClient_1.HashiClient)
            this.#client = client;
        return this;
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
        if (typeof definition === 'object')
            this.#definition = definition;
        return this;
    }
    /**
     * Set the technology.
     * @param technology The technology to set.
     * @returns The data map.
     */
    setTechnology(technology) {
        if (technology === 0 || technology === 1)
            this.#technology = technology;
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
     * Get some data from the data map.
     * @param key The key to look for.
     * @returns The data if found.
     */
    async getRaw(key = this.definition.defaultValues[this.primaryKey]) {
        let value = null;
        if (this.technology === DB_TECHNOLOGY.SQLITE)
            return this.enmap.get(key);
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
        if (this.technology === DB_TECHNOLOGY.SQLITE) {
            if (!currentData)
                this.enmap.set(this.definition.defaultValues[this.primaryKey], this.definition.defaultValues);
            await this.update(this.definition.defaultValues[this.primaryKey], currentData);
        }
    }
    /**
     * Update some data from the database.
     * @param key The key to look.
     * @param data The full data.
     * @param path The path if the data is SQLite.
     * @returns Nothing.
     */
    async update(key = this.definition.defaultValues[this.primaryKey], data, path) {
        if (this.technology === DB_TECHNOLOGY.SQLITE)
            this.enmap.set(key, data, path ?? '');
    }
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
        return finalStructure;
    }
}
exports.DataMap = DataMap;
