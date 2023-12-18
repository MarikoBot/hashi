import { Guild, Snowflake } from 'discord.js';
import { Service } from './Service';
import { DataMapDefinition } from '../DataMap';
import { HashiClient } from '../HashiClient';
/**
 * The automatic-role definition.
 */
export declare const AutomaticRoleDefinition: {
    roles: {
        type: StringConstructor[];
    };
};
/**
 * The automatic-role structure.
 */
export type AutomaticRoleStructure = {
    roles: string[];
};
/**
 * The interface that includes all the properties of an automatic roles system.
 */
export declare const AutomaticRoleConfiguration: DataMapDefinition<typeof AutomaticRoleDefinition>;
/**
 * The class that includes all the required tools to create an automatic role system.
 */
export declare class AutomaticRoleInstance extends Service<[any]> {
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
}
