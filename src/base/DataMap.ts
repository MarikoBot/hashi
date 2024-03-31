import { Query } from 'mongoose';
import { BaseClient, DATAMAP_INTENTS, TypedDataMapStored } from './';
import { Validators, InstanceValidator, InstanceValidatorReturner } from '../decorators';
import { DataMapEntry, HashiClient, SuperModel } from '../root';

/**
 * The main class. Represents a data map technology.
 */
export class DataMap<
  DataStructure extends TypedDataMapStored,
  EntryClass extends new (...args: any[]) => DataMapEntry<DataStructure> = typeof DataMapEntry,
> extends BaseClient {
  /**
   * The name of the data map.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidId)
  public name: string = 'default';

  /**
   * The entry class to use while using the data.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(DataMapEntry))
  public entryClass: EntryClass;

  /**
   * The primary key(s). Separate it with a '+' sign.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidPrimaryKeys)
  public primaryKey: string = 'discordId';

  /**
   * The default data for the data map.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(SuperModel))
  public superModel: SuperModel;

  /**
   * Intents for the database. Be careful! Those intents MUST BE set before the launch of the process.
   */
  @Validators.ArrayValidator.OnlyEnumValues
  public intents: DATAMAP_INTENTS[] = [];

  /**
   * The constructor of a data map.
   * @param client The client instance.
   * @param name The name of the collection.
   * @param entryClass The entry class.
   */
  constructor(
    client: HashiClient,
    name: string,
    entryClass: EntryClass = <EntryClass>(<unknown>DataMapEntry<DataStructure>),
  ) {
    super(client);
    this.name = name;
    this.entryClass = entryClass;
  }

  /**
   * Display all the data included into the collection.
   * @returns The retrieved data.
   */
  public async content(): Promise<Query<any, any>> {
    const documents: this['superModel']['model'][] = await this.superModel.model.find({});
    console.log(documents);
    return documents;
  }

  /**
   * Get some data from the data map.
   * @param key The key to look for.
   * @returns The data if found.
   */
  public async getRaw(key: string = this.superModel.defaultValues[this.primaryKey]): Promise<TypedDataMapStored> {
    let value: TypedDataMapStored = null;
    console.log(key, value);
    return value;
  }

  /**
   * Automatically refreshes the data map if the data is core flagged.
   * @returns Nothing.
   */
  public async refreshCore(): Promise<void> {
    if (!this.intents.includes(DATAMAP_INTENTS.CORE)) return;

    const currentData: TypedDataMapStored = await this.getRaw(this.superModel.defaultValues[this.primaryKey]);
    console.log(currentData);
  }

  /**
   * Update some data from the database.
   * @param key The key to look.
   * @param data The full data.
   * @param path The path if the data is SQLite.
   * @returns Nothing.
   */
  public async update(
    key: string = this.superModel.defaultValues[this.primaryKey],
    data: TypedDataMapStored,
    path?: string,
  ): Promise<void> {
    console.log(key, data, path);
  }

  /**
   * Refresh the data in the database if the structure is detected to be different.
   * @param key The key to look who applies changes on.
   * @returns The player data.
   */
  protected async get(
    key: string = this.superModel.defaultValues[this.primaryKey],
  ): Promise<TypedDataMapStored | DataMapEntry<DataStructure>> {
    const data: TypedDataMapStored = await this.getRaw(key);
    if (!data) return data;

    const structure: this['superModel']['defaultValues'] = this.superModel.defaultValues;
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
    return new this.entryClass(this, <DataStructure>finalStructure);
  }
}
