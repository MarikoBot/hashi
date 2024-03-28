"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSuperModel = void 0;
const root_1 = require("../root");
/**
 // --- EXAMPLE --- //
 * An example of use case for the SuperModel.
 */
class UserSuperModel extends root_1.SuperModel {
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
    /**
     * Define the name of the model into the super constructor using default parameters.
     */
    constructor(name = 'user') {
        super(name);
    }
}
exports.UserSuperModel = UserSuperModel;
