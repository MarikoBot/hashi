"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });
const src_1 = require("../src");
const discord_js_1 = require("discord.js");
console.log({ ...(require('./hashi.config.json')) });
const client = new src_1.Client({ ...(require('./hashi.config.json')) });
void client.connectDatabase();
let Ready = class Ready extends src_1.DiscordEvent {
    callback(client) {
        void client.logger.sendTo('status', { content: '<:MarikoOnline:1186296992629014558> The bot is now **online**.' });
    }
};
Ready = __decorate([
    client.events.inject('ready')
], Ready);
let InteractionCreate = class InteractionCreate extends src_1.DiscordEvent {
    async callback(client, interaction) {
        if (interaction.isChatInputCommand())
            await client.commands.detectAndLaunchSlashCommand(interaction);
    }
};
InteractionCreate = __decorate([
    client.events.inject('interactionCreate')
], InteractionCreate);
let Ping = class Ping extends src_1.Command {
    async callback(client, ctx) {
        await ctx.reply('https://tenor.com/view/demon-slayer-tengen-uzui-kimetsu-no-yaiba-gif-24115545').catch(client.logger.clean);
        return this.end();
    }
};
Ping = __decorate([
    client.commands.inject({
        id: 'ping',
        interferingCommands: [],
        coolDown: 3,
        subcommands: [
            { id: 'ping hi' }
        ],
        subcommandGroups: [
            {
                id: 'ping group',
                subcommands: [
                    { id: 'ping group hello' },
                    { id: 'ping group world' }
                ]
            }
        ],
        src: {
            name: 'ping',
            description: 'Replies with pong!',
            default_member_permissions: null,
            type: discord_js_1.ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'hi',
                    description: 'Say hi!',
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'group',
                    description: 'Group commands!',
                    type: discord_js_1.ApplicationCommandOptionType.SubcommandGroup,
                    options: [
                        {
                            name: 'hello',
                            description: 'Say hello!',
                            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                        },
                        {
                            name: 'world',
                            description: 'Say world!',
                            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                        }
                    ]
                }
            ]
        }
    })
], Ping);
let User = class User extends src_1.SuperModel {
    onLoaded() {
        return {
            discordId: new src_1.SuperModelColumn(String)
        };
    }
};
User = __decorate([
    client.db.inject('user')
], User);
void client.db.get('user').create({
    discordId: '1146145475683164273'
});
void client.login();
