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
exports.HashiCommandBase = void 0;
const base_1 = require("../base");
const decorators_1 = require("../decorators");
const _1 = require("./");
/**
 * The class that includes many useful functions shared between HashiMessageCommand and SlashCommand.
 */
class HashiCommandBase {
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
    // noinspection JSUnusedGlobalSymbols
    /**
     * The function who MUST be called at the end of your program in the call back function. IT IS REALLY IMPORTANT!
     *
     * @returns The exit code of the command.
     */
    end() {
        this.client.commandManager.interfering.removeInterfering(this.context.interaction.user.id, this.context.interaction.id);
        return this.errors.length === 0 ? _1.COMMAND_END.SUCCESS : _1.COMMAND_END.ISSUED;
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
     * @param CommandGroup The hashiCommand [subclass] instance.
     * @returns Nothing.
     */
    static async flowControlRegister(client, interaction, CommandGroup) {
        client.commandManager.interfering.registerInterfering(interaction.user.id, CommandGroup.subcommand?.fullName || CommandGroup.command?.fullName, interaction);
        client.commandManager.coolDowns.registerCoolDown(interaction.user.id, CommandGroup.subcommand?.fullName || CommandGroup.command?.fullName, CommandGroup.subcommand?.coolDown ||
            CommandGroup.subcommandGroup?.coolDown ||
            CommandGroup.command?.coolDown ||
            0);
    }
    /**
     * Launch the basic and starting verifications.
     *
     * @param client The client that instanced the event.
     * @param interaction The associated interaction.
     * @param CommandGroup The hashiCommand [subclass] instance.
     * @returns If the command executed successfully.
     */
    static async launch(client, interaction, CommandGroup) {
        if (!CommandGroup.subcommand && !CommandGroup.command)
            return _1.COMMAND_END.ERROR;
        const command = CommandGroup.command || CommandGroup.subcommand;
        let ctx = new base_1.Context(client, {
            channel: interaction.channel,
            command,
            interaction,
            users: [interaction.user],
        });
        ctx.interaction = interaction;
        [CommandGroup.command, ctx] = _1.HashiSlashCommand.refreshContext(CommandGroup.command, ctx);
        let flowWall = await _1.HashiSlashCommand.flowControlWall(client, interaction, ctx);
        if (!flowWall)
            return _1.COMMAND_END.ERROR;
        if (CommandGroup.subcommandGroup) {
            ctx.command = CommandGroup.subcommandGroup;
            command.context = ctx;
            flowWall = await _1.HashiSlashCommand.flowControlWall(client, interaction, ctx);
            if (!flowWall)
                return _1.COMMAND_END.ERROR;
        }
        if (CommandGroup.subcommand) {
            ctx.command = CommandGroup.subcommand;
            command.context = ctx;
            flowWall = await _1.HashiSlashCommand.flowControlWall(client, interaction, ctx);
            if (!flowWall)
                return _1.COMMAND_END.ERROR;
        }
        const authorized = await command.isAuthorized(interaction);
        if (!authorized)
            return _1.COMMAND_END.ERROR;
        await _1.HashiSlashCommand.flowControlRegister(client, interaction, CommandGroup);
        let commandWall;
        commandWall = (await CommandGroup.command.callback(client, interaction, ctx));
        if (commandWall === _1.COMMAND_END.ERROR)
            return commandWall;
        if (CommandGroup.subcommandGroup) {
            command.context.command = CommandGroup.subcommandGroup;
            commandWall = (await CommandGroup.subcommandGroup.callback(client, interaction, ctx));
            if (commandWall === _1.COMMAND_END.ERROR)
                return commandWall;
        }
        if (CommandGroup.subcommand) {
            command.context.command = CommandGroup.subcommand;
            commandWall = (await CommandGroup.subcommand.callback(client, interaction, command.context));
            if (commandWall === _1.COMMAND_END.ERROR)
                return commandWall;
        }
        return commandWall;
    }
    /**
     * Refreshes the context (avoid unreadable code in the bellow method).
     *
     * @param CommandGroupValue The command block value to refresh with.
     * @param context The context to refresh with.
     * @returns The new context and the new command.
     */
    static refreshContext(CommandGroupValue, context) {
        context.command = CommandGroupValue;
        CommandGroupValue.context = context;
        return [CommandGroupValue, context];
    }
}
exports.HashiCommandBase = HashiCommandBase;
__decorate([
    (decorators_1.Validators.StringValidator.IsHashiCommandType(_1.HashiCommandValues)),
    __metadata("design:type", String)
], HashiCommandBase.prototype, "type", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(_1.HashiClient)),
    __metadata("design:type", _1.HashiClient)
], HashiCommandBase.prototype, "client", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], HashiCommandBase.prototype, "id", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidNonFormatted,
    __metadata("design:type", String)
], HashiCommandBase.prototype, "fullName", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidNonFormatted,
    __metadata("design:type", String)
], HashiCommandBase.prototype, "description", void 0);
__decorate([
    decorators_1.Validators.ArrayValidator.OnlyHashiErrors,
    __metadata("design:type", Array)
], HashiCommandBase.prototype, "errors", void 0);
__decorate([
    decorators_1.Validators.ArrayValidator.OnlyObjects,
    __metadata("design:type", Array)
], HashiCommandBase.prototype, "interferingCommands", void 0);
__decorate([
    decorators_1.Validators.NumberValidator.Matches,
    __metadata("design:type", Number)
], HashiCommandBase.prototype, "coolDown", void 0);
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(base_1.Context)),
    __metadata("design:type", base_1.Context)
], HashiCommandBase.prototype, "context", void 0);
__decorate([
    decorators_1.Validators.ObjectValidator.KeyStringArrayPair,
    __metadata("design:type", Object)
], HashiCommandBase.prototype, "privileges", void 0);
__decorate([
    decorators_1.Validators.FunctionValidator.Matches,
    __metadata("design:type", Function)
], HashiCommandBase.prototype, "callback", void 0);
