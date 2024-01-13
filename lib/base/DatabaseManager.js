"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
const mongoose_1 = require("mongoose");
const DataMap_1 = require("./DataMap");
const Base_1 = require("./Base");
/**
 * The class who manages the database of the project.
 */
class DatabaseManager extends Base_1.Base {
    /**
     * The database name. Not useful to change it (only for MongoDB). Default: main.
     */
    #dbName = 'main';
    /**
     * The connection URI.
     */
    #connectionURI;
    /**
     * The options for the connection.
     */
    #connectOptions;
    /**
     * The list of dataMaps.
     */
    #dataMaps = {};
    /**
     * Get the database name.
     * @returns The database name.
     */
    get dbName() {
        return this.#dbName;
    }
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
     * Get the data maps.
     * @returns The data maps.
     */
    get dataMaps() {
        return this.#dataMaps;
    }
    /**
     * The constructor of the class.
     * @param client The client instance.
     */
    constructor(client) {
        super(client);
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
     * Build and save a data map.
     * @param name The name of the collection.
     */
    createDataMap(name) {
        const dataMap = new DataMap_1.DataMap(this.client, name);
        this.dataMaps[name] = dataMap;
        return dataMap;
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
     * @param force If the data map should be created if it doesn't exist.
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
