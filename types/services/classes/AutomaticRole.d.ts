import { Guild, GuildMember, Snowflake } from 'discord.js';
import { Service } from '../../base/';
import { HashiClient } from '../../root/';
/**
 * The class that includes all the required tools to create an automatic role system.
 */
export declare class AutomaticRole extends Service {
    /**
     * The guild targeted by the service.
     */
    guild: Guild;
    /**
     * The constructor of the service.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
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
