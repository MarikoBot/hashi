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
import { Query } from 'mongoose';
import { BaseClient, DATAMAP_INTENTS, TypedDataMapStored } from './';
import { DataMapEntry, HashiClient, SuperModel } from '../root';
/**
 * The main class. Represents a data map technology.
 */
export declare class DataMap<DataStructure extends TypedDataMapStored, EntryClass extends new (...args: any[]) => DataMapEntry<DataStructure> = typeof DataMapEntry> extends BaseClient {
    /**
     * The name of the data map.
     */
    name: string;
    /**
     * The entry class to use while using the data.
     */
    entryClass: EntryClass;
    /**
     * The primary key(s). Separate it with a '+' sign.
     */
    primaryKey: string;
    /**
     * The default data for the data map.
     */
    superModel: SuperModel;
    /**
     * Intents for the database. Be careful! Those intents MUST BE set before the launch of the process.
     */
    intents: DATAMAP_INTENTS[];
    /**
     * The constructor of a data map.
     * @param client The client instance.
     * @param name The name of the collection.
     * @param entryClass The entry class.
     */
    constructor(client: HashiClient, name: string, entryClass?: EntryClass);
    /**
     * Display all the data included into the collection.
     * @returns The retrieved data.
     */
    content(): Promise<Query<any, any>>;
    /**
     * Get some data from the data map.
     * @param key The key to look for.
     * @returns The data if found.
     */
    getRaw(key?: string): Promise<TypedDataMapStored>;
    /**
     * Automatically refreshes the data map if the data is core flagged.
     * @returns Nothing.
     */
    refreshCore(): Promise<void>;
    /**
     * Update some data from the database.
     * @param key The key to look.
     * @param data The full data.
     * @param path The path if the data is SQLite.
     * @returns Nothing.
     */
    update(key: string, data: TypedDataMapStored, path?: string): Promise<void>;
    /**
     * Refresh the data in the database if the structure is detected to be different.
     * @param key The key to look who applies changes on.
     * @returns The player data.
     */
    protected get(key?: string): Promise<TypedDataMapStored | DataMapEntry<DataStructure>>;
}
