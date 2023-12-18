"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBSQLite = void 0;
const DataMap_1 = require("./DataMap");
/**
 * The SQLite database technology class for Hashi.
 */
class DBSQLite extends DataMap_1.DataMap {
    /**
     * The constructor for the SQLite technology.
     * @param name The name of the collection.
     */
    constructor(name) {
        super(name, DataMap_1.DB_TECHNOLOGY.SQLITE);
    }
}
exports.DBSQLite = DBSQLite;
