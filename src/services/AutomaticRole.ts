// noinspection JSUnusedGlobalSymbols

import { Guild, GuildMember, Snowflake } from 'discord.js';
import { Service } from '../Service';
import { DataMap, DataMapDefinition } from '../DataMap';
import { HashiClient } from '../HashiClient';
import { Schema, Types } from 'mongoose';
import { DataMapEntry } from '../DataMapEntry';

/**
 * The automatic-role type.
 */
export type AutomaticRoleType = { _id: Types.ObjectId; discordId: string; roles: string[] };

/**
 * The automatic-role definition.
 */
export const AutomaticRoleSchema = {
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    unique: true,
  },
  discordId: {
    type: String,
    unique: true,
  },
  roles: { type: [String] },
};

/**
 * The automatic-role entry class.
 */
export class AutomaticRoleEntry extends DataMapEntry<AutomaticRoleType> {
  /**
   * The constructor for each entry of the automatic role system.
   * @param dataMap The data map associated with the service.
   * @param data The data encapsulated into the entry class.
   */
  constructor(dataMap: DataMap<AutomaticRoleType>, data: AutomaticRoleType) {
    super(dataMap, data);
  }
}

/**
 * The interface that includes all the properties of an automatic roles system.
 */
export const AutomaticRoleDefinition: DataMapDefinition<typeof AutomaticRoleSchema> = {
  schema: new Schema<typeof AutomaticRoleSchema>(AutomaticRoleSchema),
  defaultValues: {
    _id: new Types.ObjectId(),
    discordId: '0',
    roles: [],
  },
};

/**
 * The class that includes all the required tools to create an automatic role system.
 */
export class AutomaticRoleInstance extends Service {
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
    this.dataMap.setDefinition(AutomaticRoleDefinition);

    this.link('guildMemberAdd', [, []]);
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
  static async main(service: AutomaticRoleInstance, member: GuildMember): Promise<void> {
    if (member.guild.id !== service.guild.id) return;

    let i: number = -1;
    const roles: Snowflake[] = await service.getRoles(member.guild.id);

    while (++i < roles.length) await member.roles.add(roles[i]);
  }
}
