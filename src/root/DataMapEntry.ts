import { DataMap, TypedDataMapStored } from '../base/DataMap';

/**
 * The base class that represents a data map class object.
 * Every object into the data map will be passed in this class to improve manipulation.
 */
export class DataMapEntry<DataStructure extends TypedDataMapStored> {
  /**
   * The data map.
   */
  readonly #dataMap: DataMap<DataStructure, typeof DataMapEntry>;

  /**
   * The data.
   */
  readonly #data: DataStructure;

  /**
   * Get the data map.
   * @returns The data map.
   */
  get dataMap(): DataMap<DataStructure, typeof DataMapEntry> {
    return this.#dataMap;
  }

  /**
   * Get the data.
   * @returns The data.
   */
  get data(): DataStructure {
    return this.#data;
  }

  /**
   * The constructor of a data map entry.
   * @param dataMap The data map.
   * @param data The data.
   */
  constructor(dataMap: DataMap<DataStructure, typeof DataMapEntry>, data: DataStructure) {
    this.#dataMap = dataMap;
    this.#data = data;
  }
}
