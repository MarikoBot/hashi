"use strict";
// noinspection JSUnusedGlobalSymbols
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const discord_js_1 = require("discord.js");
const _1 = require("./");
const decorators_1 = require("../decorators");
const public_1 = require("../public");
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
     * The constructor of the context.
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
     * Add a user.
     * @param user The user to add.
     * @returns The class instance.
     */
    addUser(user) {
        if (user instanceof discord_js_1.User)
            this.users.push(user);
        return this;
    }
    /**
     * Remove a user.
     * @param user The user to remove.
     * @returns The class instance.
     */
    removeUser(user) {
        if (user instanceof discord_js_1.User)
            this.users = this.users.filter((presentUser) => presentUser.id !== user.id);
        return this;
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
    /**
     * Extract data from a string. Extract especially tags to apply properties.
     * @param str The string to extract from.
     * @param brackets The brackets to remove the content from.
     * @returns An object with the data extracted and the string without the tags.
     */
    static extractDataFromStr(str, brackets = ['{{', '}}']) {
        const data = {};
        let finalStr = str;
        let KV;
        let key;
        let value;
        let i = -1;
        while (++i < str.split(brackets[0]).length - 1) {
            if (finalStr.split(brackets[0]).length <= 1)
                break;
            KV = finalStr.split(brackets[0])[1].split(brackets[1])[0];
            key = KV.split('::')[0];
            value = KV.split('::')[1];
            if (finalStr.includes(brackets[0]))
                finalStr =
                    finalStr.split(brackets[0])[0] + (finalStr.includes(brackets[1]) ? finalStr.split(brackets[1])[1] : '');
            data[key] = value;
        }
        return { data, origin: finalStr };
    }
}
exports.Context = Context;
__decorate([
    decorators_1.Validators.StringValidator.ValidLanguage
], Context.prototype, "languageId", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.CommandBlockValueInitial
], Context.prototype, "command", void 0);
__decorate([
    decorators_1.Validators.ArrayValidator.OnlyUsers
], Context.prototype, "users", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.ContextChannelInitial
], Context.prototype, "channel", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.IsInstanceOf(public_1.PublicChatInputCommandInteraction)
], Context.prototype, "interaction", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.Matches
], Context.prototype, "buttonInteraction", void 0);
