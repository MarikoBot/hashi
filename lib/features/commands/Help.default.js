"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
/**
 * The default feature for the help command.
 */
const data = (_Command, _Client, _Context) => ({
    /**
     * The class instance.
     */
    default: class HelpDefault extends _Command {
        async callback(client, ctx) {
            await ctx.reply('You may get helped later.');
            return this.end();
        }
    },
    /**
     * The metadata to inject.
     */
    metadata: {
        id: 'help',
        coolDown: 5,
        src: {
            name: 'help',
            description: 'The default help command description.',
            type: v10_1.ApplicationCommandType.ChatInput,
            default_member_permissions: null,
        },
    },
});
exports.default = data;
