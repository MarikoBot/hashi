import { Guild, GuildMember, Snowflake } from 'discord.js';
import { Service } from '../../base/';
import { DataMap } from '../../base/';
import { HashiClient } from '../../root/';
import { DataMapEntry } from '../../root/';
import { AutomaticRoleType } from '../types';
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
 * The class that includes all the required tools to create an automatic role system.
 */
export declare class AutomaticRole extends Service {
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
    setGuild(guild: Guild): AutomaticRole;
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
    static main(service: AutomaticRole, member: GuildMember): Promise<void>;
}
