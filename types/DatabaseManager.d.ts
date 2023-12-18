/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HashiClient } from './HashiClient';
import { ConnectOptions } from 'mongoose';
import { DataMap, PossibleDataMapStored, DB_TECHNOLOGY } from './DataMap';
import { DBSQLite } from './DBSQLite';
import { DBMongo } from './DBMongo';
/**
 * The type that includes all the data maps of the database.
 */
export type DataMapsMap = {
    [dmName: string]: DBMongo<PossibleDataMapStored> | DBSQLite;
};
/**
 * The class who manages the database of the project.
 */
export declare class DatabaseManager {
    #private;
    /**
     * The client instance.
     */
    readonly client: HashiClient;
    /**
     * Get the connection URI.
     * @returns The connection URI.
     */
    get connectionURI(): string;
    /**
     * Get the connect options.
     * @returns The connect options.
     */
    get connectOptions(): ConnectOptions;
    /**
     * Get the database name.
     * @returns The database name.
     */
    get dbName(): string;
    /**
     * Get the data maps.
     * @returns The data maps.
     */
    get dataMaps(): DataMapsMap;
    /**
     * Build and save a data map.
     * @param name The name of the collection.
     * @param technology The technology to use.
     */
    createDataMap(name: string, technology?: DB_TECHNOLOGY): DataMap<PossibleDataMapStored>;
    /**
     * The constructor of the class.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Set the connection URI.
     * @param connectionURI The connection URI to set.
     * @returns The class instance.
     */
    setConnectionURI(connectionURI: string): DatabaseManager;
    /**
     * Set the connect options.
     * @param connectOptions The connect options to set.
     * @returns The class instance.
     */
    setConnectOptions(connectOptions: ConnectOptions): DatabaseManager;
    /**
     * Set the database name.
     * @param dbName The database name to set.
     * @returns The class instance.
     */
    setDbName(dbName: string): DatabaseManager;
    /**
     * Connect the data base to the mongodb cluster.
     * @param connectionURI The connection URI.
     * @param connectOptions The connection options.
     */
    connect(connectionURI?: string, connectOptions?: ConnectOptions): Promise<void>;
    /**
     * Get a data map with the possibility to create it if it doesn't exist.
     * @param dataMapName The data map name.
     * @param force If the data map should be created if doesn't exist.
     * @param technology The technology to use for the data map.
     * @returns The [created] data map
     */
    ensure(dataMapName: string, force?: boolean, technology?: DB_TECHNOLOGY): DBSQLite | DBMongo<PossibleDataMapStored>;
}
