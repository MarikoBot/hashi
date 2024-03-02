/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema, Types } from 'mongoose';
import { DataMapDefinition } from '../../base';
/**
 * The interface that includes all the properties of an automatic roles system.
 */
export declare const AutomaticRoleDefinition: DataMapDefinition<typeof AutomaticRoleStructure>;
/**
 * The automatic-role definition.
 */
export declare const AutomaticRoleStructure: {
    _id: {
        type: typeof Schema.Types.ObjectId;
        default: () => Types.ObjectId;
        unique: boolean;
    };
    discordId: {
        type: StringConstructor;
        unique: boolean;
    };
    roles: {
        type: StringConstructor[];
    };
};
