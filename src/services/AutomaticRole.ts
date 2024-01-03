// noinspection JSUnusedGlobalSymbols

import { Guild, GuildMember, Snowflake } from 'discord.js';
import { Service } from './Service';
import { DataMapDefinition } from '../DataMap';
import { HashiClient } from '../HashiClient';
import { Schema } from 'mongoose';

/**
 * The automatic-role definition.
 */
export const AutomaticRoleDefinition = { roles: { type: [String] } };

/**
 * The automatic-role structure.
 */
export type AutomaticRoleStructure = { roles: string[] };

/**
 * The interface that includes all the properties of an automatic roles system.
 */
export const AutomaticRoleConfiguration: DataMapDefinition<typeof AutomaticRoleDefinition> = {
  schema: new Schema<typeof AutomaticRoleDefinition>({ roles: { type: [String] } }),
  defaultValues: {
    roles: [],
  },
};

/**
 * The main function.
 * Add a role automatically when a user join.
 * @param member The guild member.
 * @param service The service instance.
 * @returns Nothing.
 */
async function main(member: GuildMember, service: AutomaticRoleInstance): Promise<void> {
  if (member.guild.id !== service.guild.id) return;

  let i: number = -1;
  const roles: Snowflake[] = await service.getRoles(member.guild.id);
  while (++i < roles.length) {
    await member.roles.add(roles[i]);
  }
}

/**
 * The class that includes all the required tools to create an automatic role system.
 */
export class AutomaticRoleInstance extends Service<[any]> {
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
    super(client, 'automaticRole', 'automaticRole');
    this.dataMap.setDefinition(AutomaticRoleConfiguration);

    this.link('guildMemberAdd', [main, []]);
  }

  /**
   * Set the guild.
   * @param guild The guild to set.
   */
  public setGuild(guild: Guild): AutomaticRoleInstance {
    if (guild instanceof Guild) this.#guild = guild;
    return this;
  }

  /**
   * Get the roles from the database.
   * @param guildId The guild id to get the data from.
   * @returns The roles id list.
   */
  public async getRoles(guildId: Snowflake): Promise<Snowflake[]> {
    return <AutomaticRoleStructure['roles']>await this.dataMap.getRaw(guildId);
  }
}
