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
exports.DatabaseManager = void 0;
const mongoose_1 = require("mongoose");
const _1 = require("./");
const decorators_1 = require("../decorators");
const root_1 = require("../root/");
/**
 * The class who manages the database of the project.
 */
class DatabaseManager extends _1.BaseClient {
    /**
     * The database name. Not useful to change it (only for MongoDB). Default: main.
     */
    dbName = 'main';
    /**
     * The connection URI.
     */
    connectionURI;
    /**
     * The options for the connection.
     */
    connectOptions;
    /**
     * The list of dataMaps.
     */
    dataMaps = {};
    /**
     * @param client The client instance.
     */
    constructor(client) {
        super(client);
    }
    /**
     * Build and save a data map.
     * @param name The name of the collection.
     */
    createDataMap(name) {
        const dataMap = new _1.DataMap(this.client, name);
        this.dataMaps[name] = dataMap;
        return dataMap;
    }
    /**
     * Synchronize the datamaps created by the coder into their own repository.
     * Synchronize this project files too.
     * @returns The class instance.
     */
    loadDataMaps() {
        const superModels = this.client.fileManager.read(`${root_1.FileManager.ABSPATH}${this.client.dataMapsDir}`, `${root_1.FileManager.RMPATH}${this.client.dataMapsDir}`, {
            absPathStrSelf: `./lib/${this.client.dataMapsDir}`,
            rmPathStrSelf: `../${this.client.dataMapsDir}`,
        });
        let superModel;
        let dataMap;
        let i = -1;
        while (++i < superModels.length) {
            superModel = superModels[i][1][superModels[i][0]];
            dataMap = this.createDataMap(superModel.name);
            dataMap.superModel = superModel;
        }
        return this;
    }
    /**
     * Connect the database to the mongodb cluster.
     * @param connectionURI The connection URI.
     * @param connectOptions The connection options.
     */
    async connect(connectionURI = this.connectionURI, connectOptions = { dbName: this.dbName }) {
        if (connectionURI)
            this.connectionURI = connectionURI;
        if (connectOptions)
            this.connectOptions = connectOptions;
        await (0, mongoose_1.connect)(this.connectionURI, this.connectOptions);
    }
}
exports.DatabaseManager = DatabaseManager;
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], DatabaseManager.prototype, "dbName", void 0);
__decorate([
    decorators_1.Validators.StringValidator.NotEmpty,
    __metadata("design:type", String)
], DatabaseManager.prototype, "connectionURI", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.Matches,
    __metadata("design:type", Object)
], DatabaseManager.prototype, "connectOptions", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.KeyDataMapPair(_1.DataMap)),
    __metadata("design:type", Object)
], DatabaseManager.prototype, "dataMaps", void 0);
