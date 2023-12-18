// noinspection JSUnusedGlobalSymbols

import { HashiClient } from './HashiClient';
import { connect, ConnectOptions } from 'mongoose';
import { DataMap, PossibleDataMapStored, DB_TECHNOLOGY } from './DataMap';
import { DBSQLite } from './DBSQLite';
import { DBMongo } from './DBMongo';

/**
 * The type that includes all the data maps of the database.
 */
export type DataMapsMap = { [dmName: string]: DBMongo<PossibleDataMapStored> | DBSQLite };

/**
 * The class who manages the database of the project.
 */
export class DatabaseManager {
  /**
   * The client instance.
   */
  public readonly client: HashiClient;

  /**
   * The connection URI if needed for the MongoDB technology.
   */
  #connectionURI: string;

  /**
   * The options for the MongoDB technology if needed.
   */
  #connectOptions: ConnectOptions;

  /**
   * The database name. Not useful to change it (only for MongoDB). Default: main.
   */
  #dbName: string = 'main';

  /**
   * The list of dataMaps (MongoDB and SQLite mixed).
   */
  #dataMaps: DataMapsMap = {};

  /**
   * Get the connection URI.
   * @returns The connection URI.
   */
  get connectionURI(): string {
    return this.#connectionURI;
  }

  /**
   * Get the connect options.
   * @returns The connect options.
   */
  get connectOptions(): ConnectOptions {
    return this.#connectOptions;
  }

  /**
   * Get the database name.
   * @returns The database name.
   */
  get dbName(): string {
    return this.#dbName;
  }

  /**
   * Get the data maps.
   * @returns The data maps.
   */
  get dataMaps(): DataMapsMap {
    return this.#dataMaps;
  }

  /**
   * Build and save a data map.
   * @param name The name of the collection.
   * @param technology The technology to use.
   */
  public createDataMap(name: string, technology: DB_TECHNOLOGY = DB_TECHNOLOGY.SQLITE): DataMap<PossibleDataMapStored> {
    let dataMap: DataMap<PossibleDataMapStored>;

    if (technology === DB_TECHNOLOGY.SQLITE) dataMap = new DBSQLite(name);

    dataMap.setClient(this.client);
    this.dataMaps[name] = dataMap;

    return dataMap;
  }

  /**
   * The constructor of the class.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    this.client = client;
  }

  /**
   * Set the connection URI.
   * @param connectionURI The connection URI to set.
   * @returns The class instance.
   */
  public setConnectionURI(connectionURI: string): DatabaseManager {
    if (typeof connectionURI === 'string') this.#connectionURI = connectionURI;
    return this;
  }

  /**
   * Set the connect options.
   * @param connectOptions The connect options to set.
   * @returns The class instance.
   */
  public setConnectOptions(connectOptions: ConnectOptions): DatabaseManager {
    if (typeof connectOptions === 'object') this.#connectOptions = connectOptions;
    return this;
  }

  /**
   * Set the database name.
   * @param dbName The database name to set.
   * @returns The class instance.
   */
  public setDbName(dbName: string): DatabaseManager {
    if (typeof dbName === 'string') this.#dbName = dbName;
    return this;
  }

  /**
   * Connect the data base to the mongodb cluster.
   * @param connectionURI The connection URI.
   * @param connectOptions The connection options.
   */
  public async connect(
    connectionURI: string = this.connectionURI,
    connectOptions: ConnectOptions = { dbName: this.dbName },
  ): Promise<void> {
    if (connectionURI) this.#connectionURI = connectionURI;
    if (connectOptions) this.#connectOptions = connectOptions;

    await connect(this.connectionURI, this.connectOptions);
  }

  /**
   * Get a data map with the possibility to create it if it doesn't exist.
   * @param dataMapName The data map name.
   * @param force If the data map should be created if doesn't exist.
   * @param technology The technology to use for the data map.
   * @returns The [created] data map
   */
  public ensure(
    dataMapName: string,
    force: boolean = false,
    technology: DB_TECHNOLOGY = DB_TECHNOLOGY.SQLITE,
  ): DBSQLite | DBMongo<PossibleDataMapStored> {
    if (dataMapName in this.dataMaps) return this.dataMaps[dataMapName];

    if (force) return this.createDataMap(dataMapName, technology);
    return null;
  }
}
