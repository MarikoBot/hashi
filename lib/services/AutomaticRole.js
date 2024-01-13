"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRoleInstance = exports.AutomaticRoleConfiguration = exports.AutomaticRoleDefinition = void 0;
const discord_js_1 = require("discord.js");
const Service_1 = require("../Service");
const mongoose_1 = require("mongoose");
/**
 * The automatic-role definition.
 */
exports.AutomaticRoleDefinition = { roles: { type: [String] } };
/**
 * The interface that includes all the properties of an automatic roles system.
 */
exports.AutomaticRoleConfiguration = {
    schema: new mongoose_1.Schema({ roles: { type: [String] } }),
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
async function main(member, service) {
    if (member.guild.id !== service.guild.id)
        return;
    let i = -1;
    const roles = await service.getRoles(member.guild.id);
    while (++i < roles.length) {
        await member.roles.add(roles[i]);
    }
}
/**
 * The class that includes all the required tools to create an automatic role system.
 */
class AutomaticRoleInstance extends Service_1.Service {
    /**
     * The guild targeted by the service.
     */
    #guild;
    /**
     * Get the guild.
     * @returns The guild.
     */
    get guild() {
        return this.#guild;
    }
    /**
     * The constructor of the service.
     * @param client The client instance.
     */
    constructor(client) {
        super(client, 'automaticRole', 'automaticRole');
        this.dataMap.setDefinition(exports.AutomaticRoleConfiguration);
        this.link('guildMemberAdd', [main, []]);
    }
    /**
     * Set the guild.
     * @param guild The guild to set.
     */
    setGuild(guild) {
        if (guild instanceof discord_js_1.Guild)
            this.#guild = guild;
        return this;
    }
    /**
     * Get the roles from the database.
     * @param guildId The guild id to get the data from.
     * @returns The roles id list.
     */
    async getRoles(guildId) {
        return await this.dataMap.getRaw(guildId);
    }
}
exports.AutomaticRoleInstance = AutomaticRoleInstance;
