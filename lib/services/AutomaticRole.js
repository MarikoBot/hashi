"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRoleInstance = exports.AutomaticRoleDefinition = exports.AutomaticRoleEntry = exports.AutomaticRoleSchema = void 0;
const discord_js_1 = require("discord.js");
const Service_1 = require("../Service");
const mongoose_1 = require("mongoose");
const DataMapEntry_1 = require("../DataMapEntry");
/**
 * The automatic-role definition.
 */
exports.AutomaticRoleSchema = {
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
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
class AutomaticRoleEntry extends DataMapEntry_1.DataMapEntry {
    /**
     * The constructor for each entry of the automatic role system.
     * @param dataMap The data map associated with the service.
     * @param data The data encapsulated into the entry class.
     */
    constructor(dataMap, data) {
        super(dataMap, data);
    }
}
exports.AutomaticRoleEntry = AutomaticRoleEntry;
/**
 * The interface that includes all the properties of an automatic roles system.
 */
exports.AutomaticRoleDefinition = {
    schema: new mongoose_1.Schema(exports.AutomaticRoleSchema),
    defaultValues: {
        _id: new mongoose_1.Types.ObjectId(),
        discordId: '0',
        roles: [],
    },
};
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
        this.dataMap.setDefinition(exports.AutomaticRoleDefinition);
        this.link('guildMemberAdd', [, []]);
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
exports.AutomaticRoleInstance = AutomaticRoleInstance;
