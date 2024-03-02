// noinspection JSUnusedGlobalSymbols

import { connect, Model, ConnectOptions } from 'mongoose';
import { BaseClient, DataMap, DataMapDefinition, TypedDataMapStored } from './';
import { Validators } from '../decorators';
import { FileManager, HashiClient } from '../root/';

/**
 * The class who manages the database of the project.
 */
export class DatabaseManager extends BaseClient {
  /**
   * The database name. Not useful to change it (only for MongoDB). Default: main.
   */
  @Validators.StringValidator.ValidId
  public dbName: string = 'main';

  /**
   * The connection URI.
   */
  @Validators.StringValidator.NotEmpty
  public connectionURI: string;

  /**
   * The options for the connection.
   */
  @Validators.ObjectValidator.Matches
  public connectOptions: ConnectOptions;

  /**
   * The list of dataMaps.
   */
  @Validators.ObjectValidator.KeyDataMapPair
  public dataMaps: DataMapsObject = {};

  /**
   * The constructor of the class.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    super(client);
  }

  /**
   * Build and save a data map.
   * @param name The name of the collection.
   */
  public createDataMap(name: string): DataMap<TypedDataMapStored> {
    const dataMap: DataMap<TypedDataMapStored> = new DataMap<TypedDataMapStored>(this.client, name);
    this.dataMaps[name] = dataMap;
    return dataMap;
  }

  /**
   * Synchronize the datamaps created by the coder into their own repository.
   * Synchronize this project files too.
   * @returns The class instance.
   */
  public loadDataMaps(): DatabaseManager {
    const definitions: [string, DataMapDefinition<any>][] = this.client.fileManager.read<DataMapDefinition<any>>(
      `${FileManager.ABSPATH}${this.client.dataMapsDir}`,
      `${FileManager.RMPATH}${this.client.dataMapsDir}`,
      {
        absPathStrSelf: `./lib/${this.client.dataMapsDir}`,
        rmPathStrSelf: `../${this.client.dataMapsDir}`,
      },
    );
    const models: [string, Model<any>][] = this.client.fileManager.read<Model<any>>(
      `${FileManager.ABSPATH}${this.client.dataMapsDir}/../models`,
      `${FileManager.RMPATH}${this.client.dataMapsDir}/../models`,
      {
        absPathStrSelf: `./lib/${this.client.dataMapsDir}/../models`,
        rmPathStrSelf: `../${this.client.dataMapsDir}/../models`,
      },
    );

    let definition: DataMapDefinition<any>;
    let model: Model<any>;
    let dataMap: DataMap<any, any>;

    let i: number = -1;
    while (++i < definitions.length) {
      definition = definitions[i][1][definitions[i][0]];
      model = models[i][1][models[i][0]];

      dataMap = this.createDataMap(definition.name);
      dataMap.definition = { ...definition, model };
    }
    return this;
  }

  /**
   * Connect the database to the mongodb cluster.
   * @param connectionURI The connection URI.
   * @param connectOptions The connection options.
   */
  public async connect(
    connectionURI: string = this.connectionURI,
    connectOptions: ConnectOptions = { dbName: this.dbName },
  ): Promise<void> {
    if (connectionURI) this.connectionURI = connectionURI;
    if (connectOptions) this.connectOptions = connectOptions;

    await connect(this.connectionURI, this.connectOptions);
  }

  /**
   * Get a data map with the possibility to create it if it doesn't exist.
   * @param dataMapName The data map name.
   * @param force If the data map should be created if it doesn't exist.
   * @returns The [created] data map
   */
  public ensure(dataMapName: string, force: boolean = false): DataMap<TypedDataMapStored> {
    if (dataMapName in this.dataMaps) return this.dataMaps[dataMapName];

    if (force) return this.createDataMap(dataMapName);
    return null;
  }
}

/**
 * The type that includes all the data maps of the database.
 */
export type DataMapsObject = { [dmName: string]: DataMap<any> };
