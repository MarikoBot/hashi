"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRoleModel = void 0;
const mongoose_1 = require("mongoose");
const definitions_1 = require("../definitions");
exports.AutomaticRoleModel = (0, mongoose_1.model)('automaticRole', definitions_1.AutomaticRoleDefinition.schema);
