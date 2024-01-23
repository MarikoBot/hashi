"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const discord_js_1 = require("discord.js");
const _1 = require("./");
/**
 * The class who manages the front part of an interaction with Discord and the user.
 */
class Context extends _1.Base {
    /**
     * The language id of the main user.
     */
    #languageId = 'fr';
    /**
     * The command associated with the context.
     */
    #command;
    /**
     * The users implicated in the context/action.
     */
    #users;
    /**
     * The channel where the action occurs.
     */
    #channel;
    /**
     * The interaction, if there is one.
     */
    #interaction;
    /**
     * The interaction button, if there is one.
     */
    #buttonInteraction;
    /**
     * Get the language id.
     * @returns The language id.
     */
    get languageId() {
        return this.#languageId;
    }
    /**
     * Get the command.
     * @returns The command.
     */
    get command() {
        return this.#command;
    }
    /**
     * Get the users.
     * @returns The users.
     */
    get users() {
        return this.#users;
    }
    /**
     * Get the channel.
     * @returns The channel.
     */
    get channel() {
        return this.#channel;
    }
    /**
     * Get the interaction.
     * @returns The interaction.
     */
    get interaction() {
        return this.#interaction;
    }
    /**
     * Get the button interaction.
     * @returns The button interaction.
     */
    get buttonInter() {
        return this.#buttonInteraction;
    }
    /**
     * The constructor of the context.
     * @param client The client instance.
     * @param options The context options.
     */
    constructor(client, options) {
        super(client);
        if (options.languageId)
            this.setLanguageId(options.languageId);
        if (options.command)
            this.setCommand(options.command);
        this.setUsers(options.users);
        this.setChannel(options.channel);
        if (this.interaction)
            this.setInteraction(options.interaction);
        if (this.buttonInter)
            this.setButtonInteraction(options.buttonInteraction);
    }
    /**
     * Set the language id.
     * @param languageId The language id to set.
     * @returns The class instance.
     */
    setLanguageId(languageId) {
        if (typeof languageId === 'string')
            this.#languageId = languageId;
        return this;
    }
    /**
     * Set the command.
     * @param commandBlock The command block to set.
     * @returns The class instance.
     */
    setCommand(commandBlock) {
        if (typeof commandBlock === 'object')
            this.#command = commandBlock;
        return this;
    }
    /**
     * Add a user.
     * @param user The user to add.
     * @returns The class instance.
     */
    addUser(user) {
        if (user instanceof discord_js_1.User)
            this.#users.push(user);
        return this;
    }
    /**
     * Remove a user.
     * @param user The user to remove.
     * @returns The class instance.
     */
    removeUser(user) {
        if (user instanceof discord_js_1.User)
            this.#users = this.#users.filter((presentUser) => presentUser.id !== user.id);
        return this;
    }
    /**
     * Set the users.
     * @param users The users to set.
     * @returns The class instance.
     */
    setUsers(users) {
        if (users.every((user) => user instanceof discord_js_1.User))
            this.#users = users;
        return this;
    }
    /**
     * Set the channel.
     * @param channel The channel to set.
     * @returns The class instance.
     */
    setChannel(channel) {
        if (typeof channel === 'object')
            this.#channel = channel;
        return this;
    }
    /**
     * Set the interaction.
     * @param interaction The interaction to set.
     * @returns The class instance.
     */
    setInteraction(interaction) {
        if (interaction instanceof discord_js_1.ChatInputCommandInteraction)
            this.#interaction = interaction;
        return this;
    }
    /**
     * Set the button interaction.
     * @param buttonInter The button interaction to set.
     * @returns The class instance.
     */
    setButtonInteraction(buttonInter) {
        if (buttonInter instanceof discord_js_1.ButtonInteraction)
            this.#buttonInteraction = buttonInter;
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
