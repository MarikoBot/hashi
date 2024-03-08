import { DataMap, TypedDataMapStored } from '../base/';
import { Validators } from '../decorators';
import { InstanceValidator } from '../decorators/shared';

/**
 * The base class that represents a data map class object.
 * Every object into the data map will be passed in this class to improve manipulation.
 */
export class DataMapEntry<DataStructure extends TypedDataMapStored> {
  /**
   * The data map.
   */
  @((<(arg: typeof DataMap) => InstanceValidator>Validators.ObjectValidator.IsInstanceOf)(DataMap))
  public readonly dataMap: DataMap<DataStructure, typeof DataMapEntry>;

  /**
   * The data.
   */
  public readonly data: DataStructure;

  /**
   * The constructor of a data map entry.
   * @param dataMap The data map.
   * @param data The data.
   */
  constructor(dataMap: DataMap<DataStructure, typeof DataMapEntry>, data: DataStructure) {
    this.dataMap = dataMap;
    this.data = data;
  }
}
