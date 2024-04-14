"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const discord_js_1 = require("discord.js");
const _1 = require("./");
const decorators_1 = require("../decorators");
const public_1 = require("../public");
const root_1 = require("../root");
/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
class Context extends _1.BaseClient {
    /**
     * The language id of the main user.
     */
    languageId = 'fr';
    /**
     * The command associated with the context.
     */
    command;
    /**
     * The users implicated in the context/action.
     */
    users;
    /**
     * The channel where the action occurs.
     */
    channel;
    /**
     * The interaction, if there is one.
     */
    interaction;
    /**
     * The interaction button, if there is one.
     */
    buttonInteraction;
    /**
     * @param client The client instance.
     * @param options The context options.
     */
    constructor(client, options) {
        super(client);
        if (options.languageId)
            this.languageId = options.languageId;
        if (options.command)
            this.command = options.command;
        this.users = options.users;
        this.channel = options.channel;
        if (this.interaction)
            this.interaction = options.interaction;
        if (this.buttonInteraction)
            this.buttonInteraction = options.buttonInteraction;
    }
    /**
     * Reply to an interaction.
     * @param messageData The message data to send (Discord.<BaseMessageOptions>).
     * @param interaction The interaction to reply to.
     * @returns The message instance, or null if not sent.
     */
    async reply(messageData, interaction = this.interaction) {
        if (!this.channel.isTextBased())
            return null;
        let message;
        try {
            if (!interaction.deferred)
                message = await interaction.reply(messageData).catch(this.command.client.logger.clean);
            else
                message = await interaction.followUp(messageData).catch(this.command.client.logger.clean);
            if (!message)
                return null;
        }
        catch (error) {
            this.command.client.logger.clean(error);
            return null;
        }
        return message;
    }
    // TODO:
    /**
     * Use a string from a translation with some variables on it.
     * @param key The string to get the translation from.
     * @param vars The variables to replace on.
     * @returns The translated string.
     */
    translate(key, ...vars) {
        const str = this.command.client.languageManager.getStr(this.languageId, key).split('[[]]');
        let finalStr = str[0];
        if (vars.length > 0) {
            let i = -1;
            while (++i < str.length - 1)
                finalStr += vars[i] + str[i + 1];
            return finalStr;
        }
        else
            return str.join('??');
    }
}
exports.Context = Context;
__decorate([
    (decorators_1.Validators.StringValidator.ValidLanguage(_1.Languages)),
    __metadata("design:type", String)
], Context.prototype, "languageId", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.CommandGroupValueInitial(root_1.HashiSlashCommand, root_1.HashiSlashSubcommand, root_1.HashiSlashSubcommandGroup)),
    __metadata("design:type", Object)
], Context.prototype, "command", void 0);
__decorate([
    decorators_1.Validators.ArrayValidator.OnlyUsers,
    __metadata("design:type", Array)
], Context.prototype, "users", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.ContextChannelInitial,
    __metadata("design:type", Object)
], Context.prototype, "channel", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(public_1.PublicChatInputCommandInteraction)),
    __metadata("design:type", discord_js_1.ChatInputCommandInteraction)
], Context.prototype, "interaction", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.Matches,
    __metadata("design:type", discord_js_1.ButtonInteraction)
], Context.prototype, "buttonInteraction", void 0);
