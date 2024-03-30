"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSuperModel = void 0;
const decorators_1 = require("../decorators");
const root_1 = require("../root");
/**
 * An example of use case for the SuperModel.
 */
let UserSuperModel = class UserSuperModel extends root_1.SuperModel {
    /**
     * Definitions of the columns.
     */
    columns = {
        id: new root_1.SuperModelColumn('MongooseId'),
        username: new root_1.SuperModelColumn(String, 'mariko_bot'),
        preferences: {
            favoriteColor: new root_1.SuperModelColumn(String, 'purple'),
            favoriteAnimal: new root_1.SuperModelColumn(String, 'panda'),
        },
    };
};
exports.UserSuperModel = UserSuperModel;
exports.UserSuperModel = UserSuperModel = __decorate([
    decorators_1.Injectors.SuperModelInjector('user')
], UserSuperModel);
