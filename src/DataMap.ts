// noinspection JSUnusedGlobalSymbols

import { model, Model, Schema, SchemaDefinition, Document } from 'mongoose';
import { HashiClient } from './HashiClient';

/**
 * The type that represents a document for the hashi data map.
 */
export interface DataMapDefinition<IStructure extends SchemaDefinition> {
  /**
   * The build schema.
   */
  schema: Schema<IStructure>;
  /**
   * The model if the data map is using mongo.
   */
  model?: Model<IStructure & Document>;
  /**
   * The default values.
   */
  defaultValues: PossibleDataMapStored;
}

/**
 * The possible value to store in.
 */
export type PossibleDataMapStored =
  | number
  | string
  | boolean
  | PossibleDataMapStored[]
  | { [key: string]: PossibleDataMapStored }
  | undefined;

/**
 * The list of flags for the data map intents.
 */
export enum DATAMAP_INTENTS {
  /**
   * If the data map is used for store the most important data (as process data).
   */
  CORE = 0,
}

/**
 * The main class. Represents a data map technology.
 */
export class DataMap<DataStructure extends PossibleDataMapStored> {
  /**
   * The client instance.
   */
  #client: HashiClient;

  /**
   * The name of the data map.
   */
  #name: string = 'default';

  /**
   * The primary key(s). Separate it with a '+' sign.
   */
  #primaryKey: string = 'id';

  /**
   * The default data for the data map.
   */
  #definition: DataMapDefinition<SchemaDefinition> = {
    schema: new Schema<SchemaDefinition>({ id: { type: String } }),
    defaultValues: {
      id: Date.now().toString(),
    },
  };

  /**
   * Intents for the database. Be careful! Those intents MUST BE set before the launch of the process.
   */
  #intents: DATAMAP_INTENTS[] = [];

  /**
   * The collection/model or the schema.
   */
  readonly #collection: Model<DataMapDefinition<SchemaDefinition>>;

  /**
   * Get the client.
   * @returns The client.
   */
  get client(): HashiClient {
    return this.#client;
  }

  /**
   * Get the data map name.
   * @returns The name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Get the primary key.
   * @returns The primary key.
   */
  get primaryKey(): string {
    return this.#primaryKey;
  }

  /**
   * Get the default data.
   * @returns The default data.
   */
  get definition(): DataMapDefinition<SchemaDefinition> {
    return this.#definition;
  }

  /**
   * Get the intents.
   * @returns The intents.
   */
  get intents(): DATAMAP_INTENTS[] {
    return this.#intents;
  }

  /**
   * Get the data map.
   * @returns The data map.
   */
  get collection(): Model<DataMapDefinition<SchemaDefinition>> {
    return this.#collection;
  }

  /**
   * Get the data map as mongo model.
   * @returns The data map as mongo model.
   */
  get model(): DataMapDefinition<SchemaDefinition>['model'] {
    return this.definition.model;
  }

  /**
   * The constructor of a data map.
   * @param name The name of the collection.
   */
  constructor(name: string) {
    this.#name = name;

    this.#definition.model = model<SchemaDefinition & Document>(this.name, <Schema>this.#definition.schema);
  }

  /**
   * Set the client.
   * @param client The client to set.
   * @returns The class instance.
   */
  public setClient(client: HashiClient): DataMap<DataStructure> {
    if (client instanceof HashiClient) this.#client = client;
    return this;
  }

  /**
   * Set the data map name.
   * @param name The data map name to set.
   * @returns The class instance.
   */
  public setName(name: string): DataMap<DataStructure> {
    if (typeof name === 'string') this.#name = name;
    return this;
  }

  /**
   * Set the primary key.
   * @param primaryKey The primary key to set.
   * @returns The class instance.
   */
  public setPrimaryKey(primaryKey: string): DataMap<DataStructure> {
    if (typeof primaryKey === 'string') this.#primaryKey = primaryKey;
    return this;
  }

  /**
   * Set the definition data.
   * @param definition The definition data to set.
   * @returns The data map.
   */
  public setDefinition<IStructure extends SchemaDefinition>(
    definition: DataMapDefinition<IStructure>,
  ): DataMap<DataStructure> {
    if (typeof definition === 'object') this.#definition = definition;
    return this;
  }

  /**
   * Add an intent.
   * @param intent The intent to add.
   * @returns The data map.
   */
  public addIntent(intent: DATAMAP_INTENTS): DataMap<DataStructure> {
    if (intent === DATAMAP_INTENTS.CORE) this.#intents.push(intent);
    return this;
  }

  /**
   * Get some data from the data map.
   * @param key The key to look for.
   * @returns The data if found.
   */
  public async getRaw(key: string = this.definition.defaultValues[this.primaryKey]): Promise<PossibleDataMapStored> {
    let value: PossibleDataMapStored = null;

    return value;
  }

  /**
   * Automatically refreshes the data map if the data is core flagged.
   * @returns Nothing.
   */
  public async refreshCore(): Promise<void> {
    if (!this.intents.includes(DATAMAP_INTENTS.CORE)) return;

    const currentData: PossibleDataMapStored = await this.getRaw(this.definition.defaultValues[this.primaryKey]);
  }

  /**
   * Update some data from the database.
   * @param key The key to look.
   * @param data The full data.
   * @param path The path if the data is SQLite.
   * @returns Nothing.
   */
  public async update(
    key: string = this.definition.defaultValues[this.primaryKey],
    data: PossibleDataMapStored,
    path?: string,
  ): Promise<void> {}

  /**
   * Refresh the data in the database if the structure is detected to be different.
   * @param key The key to look who applies changes on.
   * @returns The player data.
   */
  protected async get(key: string = this.definition.defaultValues[this.primaryKey]): Promise<PossibleDataMapStored> {
    const data: PossibleDataMapStored = await this.getRaw(key);
    if (!data) return data;

    const structure: this['definition']['defaultValues'] = this.definition.defaultValues;
    let finalStructure: { [key: string]: any };
    let refreshIsRequired: boolean = false;

    const compareObj = (source: object, target: object, finalObj: object): object => {
      for (const K of Object.keys(source)) {
        if (this.primaryKey.includes(K)) {
          finalObj[K] = target[K];
          continue;
        }
        if (typeof source[K] !== 'object') {
          finalObj[K] = typeof source[K] !== typeof target[K] ? source[K] : target[K];
        } else {
          if (K in target) finalObj[K] = compareObj(source[K], target[K], {});
          else {
            if (typeof finalObj[K] !== 'object') refreshIsRequired = true;
            finalObj = source[K];
          }
        }
      }
      return finalObj;
    };

    finalStructure = compareObj(<object>structure, <object>data, {});
    if (refreshIsRequired) await this.update(key, finalStructure);
    return finalStructure;
  }
}
