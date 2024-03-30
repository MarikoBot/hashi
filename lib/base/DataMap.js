"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMap = void 0;
const _1 = require("./");
const decorators_1 = require("../decorators");
const root_1 = require("../root/");
/**
 * The main class. Represents a data map technology.
 */
class DataMap extends _1.BaseClient {
    /**
     * The name of the data map.
     */
    name = 'default';
    /**
     * The entry class to use while using the data.
     */
    entryClass;
    /**
     * The primary key(s). Separate it with a '+' sign.
     */
    primaryKey = 'discordId';
    /**
     * The default data for the data map.
     */
    superModel;
    /**
     * Intents for the database. Be careful! Those intents MUST BE set before the launch of the process.
     */
    intents = [];
    /**
     * The constructor of a data map.
     * @param client The client instance.
     * @param name The name of the collection.
     * @param entryClass The entry class.
     */
    constructor(client, name, entryClass = (root_1.DataMapEntry)) {
        super(client);
        this.name = name;
        this.entryClass = entryClass;
    }
    /**
     * Add an intent.
     * @param intent The intent to add.
     * @returns The data map.
     */
    addIntent(intent) {
        if (intent === _1.DATAMAP_INTENTS.CORE)
            this.intents.push(intent);
        return this;
    }
    /**
     * Display all the data included into the collection.
     * @returns The retrieved data.
     */
    async content() {
        const documents = await this.superModel.model.find({});
        return documents;
    }
    /**
     * Get some data from the data map.
     * @param key The key to look for.
     * @returns The data if found.
     */
    async getRaw(key = this.superModel.defaultValues[this.primaryKey]) {
        let value = null;
        return value;
    }
    /**
     * Automatically refreshes the data map if the data is core flagged.
     * @returns Nothing.
     */
    async refreshCore() {
        if (!this.intents.includes(_1.DATAMAP_INTENTS.CORE))
            return;
        const currentData = await this.getRaw(this.superModel.defaultValues[this.primaryKey]);
    }
    /**
     * Update some data from the database.
     * @param key The key to look.
     * @param data The full data.
     * @param path The path if the data is SQLite.
     * @returns Nothing.
     */
    async update(key = this.superModel.defaultValues[this.primaryKey], data, path) { }
    /**
     * Refresh the data in the database if the structure is detected to be different.
     * @param key The key to look who applies changes on.
     * @returns The player data.
     */
    async get(key = this.superModel.defaultValues[this.primaryKey]) {
        const data = await this.getRaw(key);
        if (!data)
            return data;
        const structure = this.superModel.defaultValues;
        let finalStructure;
        let refreshIsRequired = false;
        const compareObj = (source, target, finalObj) => {
            for (const K of Object.keys(source)) {
                if (this.primaryKey.includes(K)) {
                    finalObj[K] = target[K];
                    continue;
                }
                if (typeof source[K] !== 'object') {
                    finalObj[K] = typeof source[K] !== typeof target[K] ? source[K] : target[K];
                }
                else {
                    if (K in target)
                        finalObj[K] = compareObj(source[K], target[K], {});
                    else {
                        if (typeof finalObj[K] !== 'object')
                            refreshIsRequired = true;
                        finalObj = source[K];
                    }
                }
            }
            return finalObj;
        };
        finalStructure = compareObj(structure, data, {});
        if (refreshIsRequired)
            await this.update(key, finalStructure);
        return new this.entryClass(this, finalStructure);
    }
}
exports.DataMap = DataMap;
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], DataMap.prototype, "name", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(root_1.DataMapEntry)),
    __metadata("design:type", Object)
], DataMap.prototype, "entryClass", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidPrimaryKeys,
    __metadata("design:type", String)
], DataMap.prototype, "primaryKey", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(root_1.SuperModel)),
    __metadata("design:type", root_1.SuperModel)
], DataMap.prototype, "superModel", void 0);
__decorate([
    decorators_1.Validators.ArrayValidator.OnlyEnumValues,
    __metadata("design:type", Array)
], DataMap.prototype, "intents", void 0);
