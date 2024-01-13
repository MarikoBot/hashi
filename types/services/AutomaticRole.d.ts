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
import { Guild, GuildMember, Snowflake } from 'discord.js';
import { Service } from '../base/Service';
import { DataMap, DataMapDefinition } from '../base/DataMap';
import { HashiClient } from '../root/HashiClient';
import { Schema, Types } from 'mongoose';
import { DataMapEntry } from '../root/DataMapEntry';
/**
 * The automatic-role type.
 */
export type AutomaticRoleType = {
    _id: Types.ObjectId;
    discordId: string;
    roles: string[];
};
/**
 * The automatic-role definition.
 */
export declare const AutomaticRoleSchema: {
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
/**
 * The automatic-role entry class.
 */
export declare class AutomaticRoleEntry extends DataMapEntry<AutomaticRoleType> {
    /**
     * The constructor for each entry of the automatic role system.
     * @param dataMap The data map associated with the service.
     * @param data The data encapsulated into the entry class.
     */
    constructor(dataMap: DataMap<AutomaticRoleType>, data: AutomaticRoleType);
}
/**
 * The interface that includes all the properties of an automatic roles system.
 */
export declare const AutomaticRoleDefinition: DataMapDefinition<typeof AutomaticRoleSchema>;
/**
 * The class that includes all the required tools to create an automatic role system.
 */
export declare class AutomaticRoleInstance extends Service {
    #private;
    /**
     * Get the guild.
     * @returns The guild.
     */
    get guild(): Guild;
    /**
     * The constructor of the service.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Set the guild.
     * @param guild The guild to set.
     */
    setGuild(guild: Guild): AutomaticRoleInstance;
    /**
     * Get the roles from the database.
     * @param guildId The guild id to get the data from.
     * @returns The roles id list.
     */
    getRoles(guildId: Snowflake): Promise<Snowflake[]>;
    /**
     * The main function.
     * Add a role automatically when a user joins.
     * @param service The service instance.
     * @param member The guild member.
     * @param service The service instance.
     * @returns Nothing.
     */
    static main(service: AutomaticRoleInstance, member: GuildMember): Promise<void>;
}
