"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBMongo = void 0;
const DataMap_1 = require("./DataMap");
/**
 * The SQLite database technology class for Hashi.
 */
class DBMongo extends DataMap_1.DataMap {
    /**
     * The constructor for the MongoDB technology.
     * @param name The name of the collection.
     */
    constructor(name) {
        super(name, DataMap_1.DB_TECHNOLOGY.MONGODB);
    }
}
exports.DBMongo = DBMongo;
