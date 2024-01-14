"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRole = void 0;
const discord_js_1 = require("discord.js");
const base_1 = require("../../base/");
/**
 * The class that includes all the required tools to create an automatic role system.
 */
class AutomaticRole extends base_1.Service {
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
        super(client, 'AutomaticRole', '0.1.0', 'automaticRole');
        this.link('guildMemberAdd', [(service) => console.log(`${service.name} launched`), []]);
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
        return (await this.dataMap.getRaw(guildId)).roles;
    }
    /**
     * The main function.
     * Add a role automatically when a user joins.
     * @param service The service instance.
     * @param member The guild member.
     * @param service The service instance.
     * @returns Nothing.
     */
    static async main(service, member) {
        if (member.guild.id !== service.guild.id)
            return;
        let i = -1;
        const roles = await service.getRoles(member.guild.id);
        while (++i < roles.length)
            await member.roles.add(roles[i]);
    }
}
exports.AutomaticRole = AutomaticRole;
