"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashBaseCommand = exports.defaultCommandCallback = exports.COMMAND_END = void 0;
const discord_js_1 = require("discord.js");
const Context_1 = require("./Context");
const HashiClient_1 = require("./HashiClient");
/**
 * The value that is returned when the command is finished.
 */
var COMMAND_END;
(function (COMMAND_END) {
    /**
     * When the command terminates goodly.
     */
    COMMAND_END[COMMAND_END["SUCCESS"] = 0] = "SUCCESS";
    /**
     * When the command did not terminate.
     */
    COMMAND_END[COMMAND_END["ERROR"] = 1] = "ERROR";
    /**
     * When the command terminates but with some problems that occurred in the process.
     */
    COMMAND_END[COMMAND_END["ISSUED"] = 1] = "ISSUED";
})(COMMAND_END || (exports.COMMAND_END = COMMAND_END = {}));
/**
 * The default callback function.
 *
 * @param client The client that instanced the process.
 * @param interaction The associated interaction.
 * @param context The front-end class to manage interactions.
 * @returns COMMAND_END The exit command code.
 */
const defaultCommandCallback = async (client, interaction, context) => {
    void client;
    void interaction;
    return context.command.end();
};
exports.defaultCommandCallback = defaultCommandCallback;
/**
 * The class who represents a base-command for the Hashi package. Extends the SlashCommandBuilder class from Discord.js.
 */
class HashiSlashBaseCommand extends discord_js_1.SlashCommandBuilder {
    /**
     * The client instance.
     */
    #client;
    /**
     * The list of errors for the command occurrence.
     */
    #errors = [];
    /**
     * The commands that must be executed before this one.
     * If one of the interfering commands is same-time running, this command will be ignored.
     */
    #interferingCommands = [];
    /**
     * The amount of time before running the command again. Must be between 0 and 300 seconds.
     */
    #coolDown = 0;
    /**
     * The command full name defined by the subcommands and subcommand groups.
     */
    #fullName;
    /**
     * The context of the command.
     */
    #context;
    /**
     * The external data for the command.
     */
    #privileges = {};
    /**
     * The callback function called.
     */
    #callback = exports.defaultCommandCallback;
    /**
     * Get the client.
     * @returns The client.
     */
    get client() {
        return this.#client;
    }
    /**
     * Get the errors.
     * @returns The errors.
     */
    get errors() {
        return this.#errors;
    }
    /**
     * Get the interfering commands.
     * @returns The interfering commands.
     */
    get interferingCommands() {
        return this.#interferingCommands;
    }
    /**
     * Get the cool down.
     * @returns The cool down.
     */
    get coolDown() {
        return this.#coolDown;
    }
    /**
     * Get the full name.
     * @returns The full name.
     */
    get fullName() {
        return this.#fullName;
    }
    /**
     * Get the context.
     * @returns The context.
     */
    get context() {
        return this.#context;
    }
    /**
     * Get the privileges.
     * @returns The privileges.
     */
    get privileges() {
        return this.#privileges;
    }
    /**
     * Get the callback.
     * @returns The callback.
     */
    get callback() {
        return this.#callback;
    }
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor(name) {
        super();
        this.setName(name);
    }
    /**
     * Set the client for the event to be successfully executed.
     * @param client The client instance.
     * @returns The class instance.
     */
    setClient(client) {
        if (client instanceof HashiClient_1.HashiClient)
            this.#client = client;
        return this;
    }
    /**
     * Delete the client.
     * @returns The class instance.
     */
    clearClient() {
        this.#client = null;
        return this;
    }
    /**
     * The interfering commands to set for the command.
     * @param interfering The interfering commands to set.
     * @returns The class instance.
     */
    setInterferingCommands(interfering) {
        if (interfering.every((interf) => typeof interf === 'string'))
            this.#interferingCommands = interfering;
        return this;
    }
    /**
     * The cool down to set for the command.
     * @param coolDown The cool down to set.
     * @returns The class instance.
     */
    setCoolDown(coolDown) {
        if (typeof coolDown === 'number')
            this.#coolDown = coolDown;
        return this;
    }
    /**
     * The full name to set for the command.
     * @param fullName The full name to set.
     * @returns The class instance.
     */
    setFullName(fullName) {
        if (typeof fullName === 'string')
            this.#fullName = fullName;
        return this;
    }
    /**
     * The context to set for the command.
     * @param context The context to set.
     * @returns The class instance.
     */
    setContext(context) {
        if (typeof context === 'object')
            this.#context = context;
        return this;
    }
    /**
     * Delete the context.
     * @returns The class instance.
     */
    clearContext() {
        this.#context = null;
        return this;
    }
    /**
     * The privileges to set for the command.
     * @param privileges The privileges to set.
     * @returns The class instance.
     */
    setPrivileges(privileges) {
        if (typeof privileges === 'object')
            this.#privileges = privileges;
        return this;
    }
    /**
     * The callback function executed when the command is triggered.
     *
     * @param callback The function to set.
     * @returns The class instance.
     */
    setCallbackFunction(callback) {
        if (typeof callback === 'function')
            this.#callback = callback;
        return this;
    }
    /**
     * Add a privilege to the command (type restriction).
     *
     * @param place The place where the restriction acts.
     * @param values The values to set for this restriction (ERASE THE EXISTING ONES).
     * @returns Nothing.
     */
    addRestrictions(place, values) {
        this.privileges[`unique${place}`] = values;
    }
    /**
     * Add a privilege to the command (type prohibition).
     *
     * @param place The place where the prohibition acts.
     * @param values The values to set for this prohibition (ERASE THE EXISTING ONES).
     * @returns Nothing.
     */
    addProhibitions(place, values) {
        this.privileges[`unique${place}`] = values;
    }
    /**
     * The function who MUST be called at the end of your program in the call back function. IT IS REALLY IMPORTANT!
     *
     * @returns The exit code of the command.
     */
    end() {
        this.client.CommandManager.Interfering.removeInterfering(this.context.interaction.user.id, this.context.interaction.id);
        return this.errors.length === 0 ? COMMAND_END.SUCCESS : COMMAND_END.ISSUED;
    }
    /**
     * Add the error to the list of errors. Permits to determine the final end-of-process code.
     *
     * @param error The error to add.
     * @returns Nothing.
     */
    catch(error) {
        this.errors.push(error);
    }
    /**
     * Returns a boolean value. If the user is authorized to run the command.
     *
     * @param interaction The interaction of the command.
     * @returns If the user can execute the command.
     */
    async isAuthorized(interaction) {
        const missing = [];
        let privileges = '0b0';
        const bitRecord = {
            forbiddenUsers: '0b10000000',
            uniqueUsers: '0b1000000',
            forbiddenGuilds: '0b100000',
            uniqueGuilds: '0b10000',
            forbiddenRoles: '0b1000',
            uniqueRoles: '0b100',
            forbiddenChannels: '0b10',
            uniqueChannels: '0b1',
        };
        if (interaction.inGuild()) {
            const forbiddenGuild = this.privileges.forbiddenGuilds && this.privileges.forbiddenGuilds.includes(interaction.guildId);
            if (forbiddenGuild)
                missing.push('forbiddenGuilds');
            if (this.privileges.uniqueGuilds) {
                if (this.privileges.uniqueGuilds.includes(interaction.guildId))
                    privileges = bitRecord['uniqueUsers'];
                else
                    missing.push('uniqueUsers');
            }
            if (interaction.channel.id) {
                const forbiddenChannel = this.privileges.forbiddenChannels && this.privileges.forbiddenChannels.includes(interaction.channel.id);
                if (forbiddenChannel)
                    missing.push('forbiddenChannels');
                if (this.privileges.uniqueChannels) {
                    if (this.privileges.uniqueChannels.includes(interaction.channel.id))
                        privileges =
                            Number(privileges) > Number(bitRecord['uniqueChannels']) ? privileges : bitRecord['uniqueChannels'];
                    else
                        missing.push('uniqueChannels');
                }
            }
            if (interaction.member) {
                const forbiddenRoles = this.privileges.forbiddenRoles &&
                    this.privileges.forbiddenRoles.some((role) => (interaction.member?.roles).cache.has(role));
                if (forbiddenRoles)
                    missing.push('forbiddenRoles');
                if (this.privileges.uniqueRoles) {
                    if (this.privileges.uniqueRoles.every((role) => (interaction.member?.roles).cache.has(role)))
                        privileges = Number(privileges) > Number(bitRecord['uniqueRoles']) ? privileges : bitRecord['uniqueRoles'];
                    else
                        missing.push('uniqueRoles');
                }
            }
        }
        const forbiddenUser = this.privileges.forbiddenUsers && this.privileges.forbiddenUsers.includes(interaction.user.id);
        if (forbiddenUser)
            missing.push('forbiddenUsers');
        if (this.privileges.uniqueUsers) {
            if (this.privileges.uniqueUsers.includes(interaction.user.id))
                privileges = Number(privileges) > Number(bitRecord['uniqueUsers']) ? privileges : bitRecord['uniqueUsers'];
            else
                missing.push('uniqueUsers');
        }
        const highestMissing = missing.sort((a, b) => Number(bitRecord[b]) - Number(bitRecord[a]))[0];
        const isAuth = missing.length > 0 ? Number(highestMissing) < Number(privileges) : true;
        if (!isAuth) {
            await this.context.reply(this.context.translate('privilegesLocked', `${missing.length}${missing
                .map((e) => Number(bitRecord[e]))
                .reduce((acc, val) => acc + val, 0)}`));
        }
        return isAuth;
    }
    /**
     * Verify if the cool downs, and the interfering commands of the command are ready to call the command again.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param ctx The context within the call.
     * @returns If the wall is passed or not.
     */
    static async flowControlWall(client, interaction, ctx) {
        const command = ctx.command;
        const activeCoolDowns = client.CommandManager.CoolDowns.coolDowns(interaction.user.id, command.fullName);
        const activeInterfering = client.CommandManager.Interfering.interfering(interaction.user.id, ...(command.interferingCommands || []));
        if (activeCoolDowns.length > 0) {
            const finishTime = String(activeCoolDowns[0][1] / 1000).split('.')[0];
            const translated = ctx.translate('activeCoolDown', command.fullName, finishTime);
            void (await ctx.reply(translated));
            return false;
        }
        if (activeInterfering.length > 0) {
            const interferingList = activeInterfering
                .map((i) => `</${i[0]}:${i[1].commandId}>`)
                .join(', ');
            const translated = ctx.translate('activeInterfering', interferingList);
            void (await ctx.reply(translated));
            return false;
        }
        return true;
    }
    /**
     * Registers the cool down and the interfering commands.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param commandBlock The hashiCommand [subclass] instance.
     * @returns Nothing.
     */
    static async flowControlRegister(client, interaction, commandBlock) {
        client.CommandManager.Interfering.registerInterfering(interaction.user.id, commandBlock.subcommand?.fullName || commandBlock.command?.fullName, interaction);
        client.CommandManager.CoolDowns.registerCoolDown(interaction.user.id, commandBlock.subcommand?.fullName || commandBlock.command?.fullName, commandBlock.subcommand?.coolDown ||
            commandBlock.subcommandGroup?.coolDown ||
            commandBlock.command?.coolDown ||
            0);
    }
    /**
     * Launch the basic and starting verifications.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param commandBlock The hashiCommand [subclass] instance.
     * @returns If the command executed successfully.
     */
    static async launch(client, interaction, commandBlock) {
        if (!commandBlock.subcommand && !commandBlock.command)
            return COMMAND_END.ERROR;
        const command = commandBlock.subcommand || commandBlock.command;
        let ctx = new Context_1.Context({
            channel: interaction.channel,
            command,
            interaction,
            users: [interaction.user],
        });
        ctx.setInteraction(interaction);
        [commandBlock.command, ctx] = HashiSlashBaseCommand.refreshContext(commandBlock.command, ctx);
        let flowWall = await HashiSlashBaseCommand.flowControlWall(client, interaction, ctx);
        if (!flowWall)
            return COMMAND_END.ERROR;
        if (commandBlock.subcommandGroup) {
            ctx.setCommand(commandBlock.subcommandGroup);
            command.setContext(ctx);
            flowWall = await HashiSlashBaseCommand.flowControlWall(client, interaction, ctx);
            if (!flowWall)
                return COMMAND_END.ERROR;
        }
        if (commandBlock.subcommand) {
            ctx.setCommand(commandBlock.subcommand);
            command.setContext(ctx);
            flowWall = await HashiSlashBaseCommand.flowControlWall(client, interaction, ctx);
            if (!flowWall)
                return COMMAND_END.ERROR;
        }
        const authorized = await command.isAuthorized(interaction);
        if (!authorized)
            return COMMAND_END.ERROR;
        await HashiSlashBaseCommand.flowControlRegister(client, interaction, commandBlock);
        let commandWall;
        commandWall = (await commandBlock.command.callback(client, interaction, ctx));
        if (commandWall === COMMAND_END.ERROR)
            return commandWall;
        if (commandBlock.subcommandGroup) {
            command.context.setCommand(commandBlock.subcommandGroup);
            commandWall = (await commandBlock.subcommandGroup.callback(client, interaction, ctx));
            if (commandWall === COMMAND_END.ERROR)
                return commandWall;
        }
        if (commandBlock.subcommand) {
            command.context.setCommand(commandBlock.subcommand);
            commandWall = (await commandBlock.subcommand.callback(client, interaction, command.context));
            if (commandWall === COMMAND_END.ERROR)
                return commandWall;
        }
        return commandWall;
    }
    /**
     * Converts a slash subcommand into a Discord friendly builder.
     * Adds it directly to the origin and returns the origin.
     *
     * @param source The origin command (where the origin is from).
     * @param subcommand The origin 'subcommand'.
     * @returns Nothing.
     */
    static transformSubcommand(source, subcommand) {
        const subBuilder = new discord_js_1.SlashCommandSubcommandBuilder();
        subBuilder.setName(subcommand.name);
        subBuilder.setDescription(subcommand.description);
        subBuilder.setNameLocalizations(subcommand.name_localizations || {});
        subBuilder.setDescriptionLocalizations(subcommand.name_localizations || {});
        if (subcommand.options.length > 0) {
            let i = -1;
            while (++i < subcommand.options.length)
                subBuilder.options.push(subcommand.options[i].toJSON());
        }
        source.addSubcommand(subBuilder);
        return;
    }
    /**
     * Converts a slash subcommand into a Discord friendly builder.
     * Adds it directly to the origin and returns the origin.
     *
     * @param source The origin command (where the origin is from).
     * @param subcommandGroup The origin 'subcommand'.
     * @returns Nothing.
     */
    static transformSubcommandGroup(source, subcommandGroup) {
        const subGroupBuilder = new discord_js_1.SlashCommandSubcommandGroupBuilder();
        subGroupBuilder.setName(subcommandGroup.name);
        subGroupBuilder.setDescription(subcommandGroup.description);
        subGroupBuilder.setNameLocalizations(subcommandGroup.name_localizations || {});
        subGroupBuilder.setDescriptionLocalizations(subcommandGroup.name_localizations || {});
        let i = -1;
        let subcommand;
        let subBuilder;
        while (++i < subcommandGroup.hashiSubcommands.length) {
            subcommand = subcommandGroup.hashiSubcommands[i];
            subcommand.setFullName(`${this.name} ${subcommand.name}`);
            subBuilder = new discord_js_1.SlashCommandSubcommandBuilder();
            subBuilder.setName(subcommand.name);
            subBuilder.setNameLocalizations(subcommand.name_localizations || {});
            subBuilder.setDescription(subcommand.description);
            subBuilder.setDescriptionLocalizations(subcommand.name_localizations || {});
            if (subcommand.options.length > 0) {
                let j = -1;
                while (++j < subcommand.options.length)
                    subBuilder.options.push(subcommand.options[j].toJSON());
            }
            subGroupBuilder.addSubcommand(subBuilder);
        }
        source.addSubcommandGroup(subGroupBuilder);
        return;
    }
    /**
     * Refreshes the context (avoid unreadable code in the bellow method).
     *
     * @param commandBlockValue The command block value to refresh with.
     * @param context The context to refresh with.
     * @returns The new context and the new command.
     */
    static refreshContext(commandBlockValue, context) {
        context.setCommand(commandBlockValue);
        commandBlockValue.setContext(context);
        return [commandBlockValue, context];
    }
}
exports.HashiSlashBaseCommand = HashiSlashBaseCommand;
