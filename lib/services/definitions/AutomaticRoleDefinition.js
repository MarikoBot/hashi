"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRoleDefinition = exports.AutomaticRoleSchema = void 0;
const mongoose_1 = require("mongoose");
/**
 * The automatic-role definition.
 */
exports.AutomaticRoleSchema = {
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
    schema: new mongoose_1.Schema(exports.AutomaticRoleSchema),
    defaultValues: {
        _id: new mongoose_1.Types.ObjectId(),
        discordId: '0',
        roles: [],
    },
};
