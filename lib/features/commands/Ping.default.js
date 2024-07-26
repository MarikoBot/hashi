"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
/**
 * The default feature for the ping command.
 */
const data = (_Command, _Client, _Context) => ({
    /**
     * The class instance.
     */
    default: class PingDefault extends _Command {
        async callback(client, ctx) {
            await ctx.reply(`My ping is **\`${client.src.ws.ping}\`**ms.`);
            return this.end();
        }
    },
    /**
     * The metadata to inject.
     */
    metadata: {
        id: 'ping',
        coolDown: 5,
        src: {
            name: 'ping',
            description: 'The default ping command description.',
            type: v10_1.ApplicationCommandType.ChatInput,
            default_member_permissions: null,
        },
    },
});
exports.default = data;
