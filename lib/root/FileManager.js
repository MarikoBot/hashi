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
exports.FileManager = void 0;
const decorators_1 = require("../decorators");
const _1 = require("./");
/**
 * The class that manages the files included into this project, and also those at the root of the package user.
 */
class FileManager {
    /**
     * The client instance.
     */
    client;
    /**
     * The constructor to instance the FileManager class. Client can be useful to pass.
     * @param client The client instance.
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * The absolute directory path based on the environment.
     * @returns The path.
     */
    static get ABSPATH() {
        return {
            lab: 'lib/',
            prod: 'lib/',
        }[process.env.ENVPATH];
    }
    /**
     * The backward directory path based on the environment.
     * @returns The path.
     */
    static get RMPATH() {
        return {
            lab: '../../lib/',
            prod: '../../../../../lib/',
        }[process.env.ENVPATH];
    }
}
exports.FileManager = FileManager;
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(_1.HashiClient)),
    __metadata("design:type", _1.HashiClient)
], FileManager.prototype, "client", void 0);
