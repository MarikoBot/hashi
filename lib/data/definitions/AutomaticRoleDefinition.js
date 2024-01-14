"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRoleDefinition = exports.AutomaticRoleStructure = void 0;
const mongoose_1 = require("mongoose");
const entries_1 = require("../entries");
/**
 * The automatic-role definition.
 */
exports.AutomaticRoleStructure = {
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
        unique: true,
    },
    discordId: {
        type: String,
        unique: true,
    },
    roles: { type: [String] },
};
/**
 * The interface that includes all the properties of an automatic roles system.
 */
exports.AutomaticRoleDefinition = {
    name: 'automaticRole',
    entry: entries_1.AutomaticRoleEntry,
    schema: new mongoose_1.Schema({
        _id: {
            type: mongoose_1.Schema.Types.ObjectId,
            default: () => new mongoose_1.Types.ObjectId(),
        },
        discordId: {
            type: String,
            unique: true,
        },
        roles: { type: [String] },
    }),
    defaultValues: {
        _id: new mongoose_1.Types.ObjectId(),
        discordId: '0',
        roles: [],
    },
};
