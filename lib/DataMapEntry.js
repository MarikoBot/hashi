"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMapEntry = void 0;
/**
 * The base class that represents a data map class object.
 * Every object into the data map will be passed in this class to improve manipulation.
 */
class DataMapEntry {
    /**
     * The data map.
     */
    #dataMap;
    /**
     * The data.
     */
    #data;
    /**
     * Get the data map.
     * @returns The data map.
     */
    get dataMap() {
        return this.#dataMap;
    }
    /**
     * Get the data.
     * @returns The data.
     */
    get data() {
        return this.#data;
    }
    /**
     * The constructor of a data map entry.
     * @param dataMap The data map.
     * @param data The data.
     */
    constructor(dataMap, data) {
        this.#dataMap = dataMap;
        this.#data = data;
    }
}
exports.DataMapEntry = DataMapEntry;
_a = DataMapEntry;
