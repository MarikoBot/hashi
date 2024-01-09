import { DataMap, TypedDataMapStored } from './DataMap';
/**
 * The base class that represents a data map class object.
 * Every object into the data map will be passed in this class to improve manipulation.
 */
export declare class DataMapEntry<DataStructure extends TypedDataMapStored> {
    #private;
    /**
     * Get the data map.
     * @returns The data map.
     */
    get dataMap(): DataMap<DataStructure, typeof DataMapEntry>;
    /**
     * Get the data.
     * @returns The data.
     */
    get data(): DataStructure;
    /**
     * The constructor of a data map entry.
     * @param dataMap The data map.
     * @param data The data.
     */
    constructor(dataMap: DataMap<DataStructure, typeof DataMapEntry>, data: DataStructure);
}
