"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRoleEntry = void 0;
const root_1 = require("../../root");
/**
 * The automatic-role entry class.
 */
class AutomaticRoleEntry extends root_1.DataMapEntry {
    /**
     * The constructor for each entry of the automatic role system.
     * @param dataMap The data map associated with the service.
     * @param data The data encapsulated into the entry class.
     */
    constructor(dataMap, data) {
        super(dataMap, data);
    }
}
exports.AutomaticRoleEntry = AutomaticRoleEntry;
