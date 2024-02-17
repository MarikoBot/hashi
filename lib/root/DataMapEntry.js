"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMapEntry = void 0;
const base_1 = require("../base/");
const decorators_1 = require("../decorators");
/**
 * The base class that represents a data map class object.
 * Every object into the data map will be passed in this class to improve manipulation.
 */
class DataMapEntry {
    /**
     * The data map.
     */
    dataMap;
    /**
     * The data.
     */
    data;
    /**
     * The constructor of a data map entry.
     * @param dataMap The data map.
     * @param data The data.
     */
    constructor(dataMap, data) {
        this.dataMap = dataMap;
        this.data = data;
    }
}
exports.DataMapEntry = DataMapEntry;
__decorate([
    decorators_1.Validators.ObjectValidator.IsInstanceOf(base_1.DataMap)
], DataMapEntry.prototype, "dataMap", void 0);
