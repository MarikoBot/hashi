"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
const mongoose_1 = require("mongoose");
const DataMap_1 = require("./DataMap");
/**
 * The class who manages the database of the project.
 */
class DatabaseManager {
    /**
     * The client instance.
     */
    client;
    /**
     * The connection URI if needed for the MongoDB technology.
     */
    #connectionURI;
    /**
     * The options for the MongoDB technology if needed.
     */
    #connectOptions;
    /**
     * The database name. Not useful to change it (only for MongoDB). Default: main.
     */
    #dbName = 'main';
    /**
     * The list of dataMaps (MongoDB).
     */
    #dataMaps = {};
    /**
     * Get the connection URI.
     * @returns The connection URI.
     */
    get connectionURI() {
        return this.#connectionURI;
    }
    /**
     * Get the connect options.
     * @returns The connect options.
     */
    get connectOptions() {
        return this.#connectOptions;
    }
    /**
     * Get the database name.
     * @returns The database name.
     */
    get dbName() {
        return this.#dbName;
    }
    /**
     * Get the data maps.
     * @returns The data maps.
     */
    get dataMaps() {
        return this.#dataMaps;
    }
    /**
     * Build and save a data map.
     * @param name The name of the collection.
     */
    createDataMap(name) {
        let dataMap;
        dataMap = new DataMap_1.DataMap(name);
        dataMap.setClient(this.client);
        this.dataMaps[name] = dataMap;
        return dataMap;
    }
    /**
     * The constructor of the class.
     * @param client The client instance.
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Set the connection URI.
     * @param connectionURI The connection URI to set.
     * @returns The class instance.
     */
    setConnectionURI(connectionURI) {
        if (typeof connectionURI === 'string')
            this.#connectionURI = connectionURI;
        return this;
    }
    /**
     * Set the connect options.
     * @param connectOptions The connect options to set.
     * @returns The class instance.
     */
    setConnectOptions(connectOptions) {
        if (typeof connectOptions === 'object')
            this.#connectOptions = connectOptions;
        return this;
    }
    /**
     * Set the database name.
     * @param dbName The database name to set.
     * @returns The class instance.
     */
    setDbName(dbName) {
        if (typeof dbName === 'string')
            this.#dbName = dbName;
        return this;
    }
    /**
     * Connect the database to the mongodb cluster.
     * @param connectionURI The connection URI.
     * @param connectOptions The connection options.
     */
    async connect(connectionURI = this.connectionURI, connectOptions = { dbName: this.dbName }) {
        if (connectionURI)
            this.#connectionURI = connectionURI;
        if (connectOptions)
            this.#connectOptions = connectOptions;
        await (0, mongoose_1.connect)(this.connectionURI, this.connectOptions);
    }
    /**
     * Get a data map with the possibility to create it if it doesn't exist.
     * @param dataMapName The data map name.
     * @param force If the data map should be created if doesn't exist.
     * @param technology The technology to use for the data map.
     * @returns The [created] data map
     */
    ensure(dataMapName, force = false) {
        if (dataMapName in this.dataMaps)
            return this.dataMaps[dataMapName];
        if (force)
            return this.createDataMap(dataMapName);
        return null;
    }
}
exports.DatabaseManager = DatabaseManager;
