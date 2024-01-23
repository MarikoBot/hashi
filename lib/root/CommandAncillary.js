"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMAND_END = exports.MetadataInjector = exports.CommandAncillary = void 0;
const base_1 = require("../base");
const _1 = require("./");
/**
 * The class that includes many useful functions shared between HashiMessageCommand and SlashCommand.
 */
class CommandAncillary {
    /**
     * The type of the command.
     */
    type;
    /**
     * The client instance.
     */
    client;
    /**
     * The name of the command.
     */
    id;
    /**
     * The full name of the command.
     */
    fullName;
    /**
     * The description of the command.
     */
    description;
    /**
     * The list of errors for the command occurrence.
     */
    errors;
    /**
     * The commands that must be executed before this one.
     * If one of the interfering commands is same-time running, this command will be ignored.
     */
    interferingCommands;
    /**
     * The amount of time before running the command again. Must be between 0 and 300 seconds.
     */
    coolDown;
    /**
     * The context of the command.
     */
    context;
    /**
     * The external data for the command.
     */
    privileges;
    /**
     * The callback function called.
     */
    callback;
    /**
     * The base constructor of a command.
     * @param type The type of the command.
     */
    constructor(type = 'message') {
        this.type = type;
    }
    /**
     * The function who MUST be called at the end of your program in the call back function. IT IS REALLY IMPORTANT!
     *
     * @returns The exit code of the command.
     */
    end() {
        this.client.commandManager.interfering.removeInterfering(this.context.interaction.user.id, this.context.interaction.id);
        return this.errors.length === 0 ? COMMAND_END.SUCCESS : COMMAND_END.ISSUED;
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
        const activeCoolDowns = client.commandManager.coolDowns.values(interaction.user.id, command.id);
        const activeInterfering = client.commandManager.interfering.values(interaction.user.id, ...(command.interferingCommands || []));
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
        client.commandManager.interfering.registerInterfering(interaction.user.id, commandBlock.subcommand?.fullName || commandBlock.command?.fullName, interaction);
        client.commandManager.coolDowns.registerCoolDown(interaction.user.id, commandBlock.subcommand?.fullName || commandBlock.command?.fullName, commandBlock.subcommand?.coolDown ||
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
        const command = commandBlock.command || commandBlock.subcommand;
        let ctx = new base_1.Context(client, {
            channel: interaction.channel,
            command,
            interaction,
            users: [interaction.user],
        });
        ctx.setInteraction(interaction);
        [commandBlock.command, ctx] = _1.HashiSlashCommand.refreshContext(commandBlock.command, ctx);
        let flowWall = await _1.HashiSlashCommand.flowControlWall(client, interaction, ctx);
        if (!flowWall)
            return COMMAND_END.ERROR;
        if (commandBlock.subcommandGroup) {
            ctx.setCommand(commandBlock.subcommandGroup);
            command.context = ctx;
            flowWall = await _1.HashiSlashCommand.flowControlWall(client, interaction, ctx);
            if (!flowWall)
                return COMMAND_END.ERROR;
        }
        if (commandBlock.subcommand) {
            ctx.setCommand(commandBlock.subcommand);
            command.context = ctx;
            flowWall = await _1.HashiSlashCommand.flowControlWall(client, interaction, ctx);
            if (!flowWall)
                return COMMAND_END.ERROR;
        }
        const authorized = await command.isAuthorized(interaction);
        if (!authorized)
            return COMMAND_END.ERROR;
        await _1.HashiSlashCommand.flowControlRegister(client, interaction, commandBlock);
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
     * Refreshes the context (avoid unreadable code in the bellow method).
     *
     * @param commandBlockValue The command block value to refresh with.
     * @param context The context to refresh with.
     * @returns The new context and the new command.
     */
    static refreshContext(commandBlockValue, context) {
        context.setCommand(commandBlockValue);
        commandBlockValue.context = context;
        return [commandBlockValue, context];
    }
}
exports.CommandAncillary = CommandAncillary;
/**
 * The decorator that insert metadata into a command.
 * @param commandMetadata The metadata to set.
 */
const MetadataInjector = (commandMetadata) => {
    return function (constructor) {
        if (!('type' in commandMetadata))
            commandMetadata['type'] = 'message';
        for (const key in commandMetadata) {
            if (key === 'src' && commandMetadata['type'] !== 'slash')
                continue;
            constructor.prototype[key] = commandMetadata[key];
            Object.defineProperty(constructor, key, {
                value: commandMetadata[key],
                writable: true,
                configurable: true,
            });
        }
    };
};
exports.MetadataInjector = MetadataInjector;
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
