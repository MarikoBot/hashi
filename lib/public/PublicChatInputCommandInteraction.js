"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicChatInputCommandInteraction = void 0;
const discord_js_1 = require("discord.js");
/**
 * The public remaster of the Discord.js interaction.
 */
class PublicChatInputCommandInteraction extends discord_js_1.ChatInputCommandInteraction {
    constructor(...args) {
        super(args[0], args[1]);
    }
}
exports.PublicChatInputCommandInteraction = PublicChatInputCommandInteraction;
