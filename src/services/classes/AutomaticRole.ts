// noinspection JSUnusedGlobalSymbols

import { Guild, GuildMember, Snowflake } from 'discord.js';
import { Service } from '../../base/';
import { HashiClient } from '../../root/';
import { AutomaticRoleType } from '../types';

/**
 * The class that includes all the required tools to create an automatic role system.
 */
export class AutomaticRole extends Service {
  /**
   * The guild targeted by the service.
   */
  #guild: Guild;

  /**
   * Get the guild.
   * @returns The guild.
   */
  get guild(): Guild {
    return this.#guild;
  }

  /**
   * The constructor of the service.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    super(client, 'AutomaticRole', '0.1.0', 'automaticRole');
  }

  /**
   * Set the guild.
   * @param guild The guild to set.
   */
  public setGuild(guild: Guild): AutomaticRole {
    if (guild instanceof Guild) this.#guild = guild;
    return this;
  }

  /**
   * Get the roles from the database.
   * @param guildId The guild id to get the data from.
   * @returns The roles id list.
   */
  public async getRoles(guildId: Snowflake): Promise<Snowflake[]> {
    return (<AutomaticRoleType>await this.dataMap.getRaw(guildId)).roles;
  }

  /**
   * The main function.
   * Add a role automatically when a user joins.
   * @param service The service instance.
   * @param member The guild member.
   * @param service The service instance.
   * @returns Nothing.
   */
  static async main(service: AutomaticRole, member: GuildMember): Promise<void> {
    if (member.guild.id !== service.guild.id) return;

    let i: number = -1;
    const roles: Snowflake[] = await service.getRoles(member.guild.id);

    while (++i < roles.length) await member.roles.add(roles[i]);
  }
}
