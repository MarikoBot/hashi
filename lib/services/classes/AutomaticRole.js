"use strict";
// noinspection JSUnusedGlobalSymbols
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRole = void 0;
const base_1 = require("../../base/");
const decorators_1 = require("../../decorators");
/**
 * The class that includes all the required tools to create an automatic role system.
 */
class AutomaticRole extends base_1.Service {
    /**
     * The guild targeted by the service.
     */
    guild;
    /**
     * The constructor of the service.
     * @param client The client instance.
     */
    constructor(client) {
        super(client, 'AutomaticRole', '0.1.0', 'automaticRole');
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
__decorate([
    decorators_1.Validators.ObjectValidator.Matches
], AutomaticRole.prototype, "guild", void 0);
