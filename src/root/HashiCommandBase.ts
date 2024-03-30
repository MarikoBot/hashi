import { ChatInputCommandInteraction, GuildMemberRoleManager, ChatInputApplicationCommandData } from 'discord.js';
import { Context } from '../base';
import { Validators } from '../decorators';
import { InstanceValidator, InstanceValidatorReturner } from '../decorators/shared';
import {
  HashiClient,
  HashiSlashCommand,
  HashiSlashSubcommand,
  CoolDownsQueueElement,
  HashiSlashCommandCallbackFunction,
  InterferingQueueElement,
  HashiCommandValues,
  CommandBlock,
  COMMAND_END,
  CommandBlockValue,
  CommandPrivilegesKey,
  CommandPrivileges,
  HashiError,
  HashiCommandType,
} from './';

/**
 * The class that includes many useful functions shared between HashiMessageCommand and SlashCommand.
 */
export class HashiCommandBase {
  /**
   * The type of the command.
   */
  @((<InstanceValidatorReturner>Validators.StringValidator.IsHashiCommandType)(HashiCommandValues))
  public readonly type: HashiCommandType;

  /**
   * The client instance.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(HashiClient))
  public client: HashiClient;

  /**
   * The name of the command.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidId)
  public id: string;

  /**
   * The full name of the command.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidNonFormatted)
  public fullName: string;

  /**
   * The description of the command.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidNonFormatted)
  public description: string;

  /**
   * The list of errors for the command occurrence.
   */
  @Validators.ArrayValidator.OnlyHashiErrors
  public errors: HashiError[];

  /**
   * The commands that must be executed before this one.
   * If one of the interfering commands is same-time running, this command will be ignored.
   */
  @Validators.ArrayValidator.OnlyObjects
  public interferingCommands: ChatInputApplicationCommandData['name'][];

  /**
   * The amount of time before running the command again. Must be between 0 and 300 seconds.
   */
  @Validators.NumberValidator.Matches
  public coolDown: number;

  /**
   * The context of the command.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(Context))
  public context: Context;

  /**
   * The external data for the command.
   */
  @(<InstanceValidator>Validators.ObjectValidator.KeyStringArrayPair)
  public privileges: CommandPrivileges;

  /**
   * The callback function called.
   */
  @Validators.FunctionValidator.Matches
  public callback: HashiSlashCommandCallbackFunction;

  /**
   * The base constructor of a command.
   * @param type The type of the command.
   */
  constructor(type: HashiCommandBase['type'] = 'message') {
    this.type = type;
  }

  /**
   * The function who MUST be called at the end of your program in the call back function. IT IS REALLY IMPORTANT!
   *
   * @returns The exit code of the command.
   */
  public end(): COMMAND_END {
    this.client.commandManager.interfering.removeInterfering(
      this.context.interaction.user.id,
      this.context.interaction.id,
    );
    return this.errors.length === 0 ? COMMAND_END.SUCCESS : COMMAND_END.ISSUED;
  }

  /**
   * Returns a boolean value. If the user is authorized to run the command.
   *
   * @param interaction The interaction of the command.
   * @returns If the user can execute the command.
   */
  public async isAuthorized(interaction: ChatInputCommandInteraction): Promise<boolean> {
    const missing: string[] = [];
    let privileges: string = '0b0';
    const bitRecord: Record<CommandPrivilegesKey, string> = {
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
      const forbiddenGuild: boolean =
        this.privileges.forbiddenGuilds && this.privileges.forbiddenGuilds.includes(interaction.guildId);
      if (forbiddenGuild) missing.push('forbiddenGuilds');

      if (this.privileges.uniqueGuilds) {
        if (this.privileges.uniqueGuilds.includes(interaction.guildId)) privileges = bitRecord['uniqueUsers'];
        else missing.push('uniqueUsers');
      }

      if (interaction.channel.id) {
        const forbiddenChannel: boolean =
          this.privileges.forbiddenChannels && this.privileges.forbiddenChannels.includes(interaction.channel.id);
        if (forbiddenChannel) missing.push('forbiddenChannels');

        if (this.privileges.uniqueChannels) {
          if (this.privileges.uniqueChannels.includes(interaction.channel.id))
            privileges =
              Number(privileges) > Number(bitRecord['uniqueChannels']) ? privileges : bitRecord['uniqueChannels'];
          else missing.push('uniqueChannels');
        }
      }
      if (interaction.member) {
        const forbiddenRoles: boolean =
          this.privileges.forbiddenRoles &&
          this.privileges.forbiddenRoles.some((role: string) =>
            (<GuildMemberRoleManager>interaction.member?.roles).cache.has(role),
          );
        if (forbiddenRoles) missing.push('forbiddenRoles');

        if (this.privileges.uniqueRoles) {
          if (
            this.privileges.uniqueRoles.every((role: string) =>
              (<GuildMemberRoleManager>interaction.member?.roles).cache.has(role),
            )
          )
            privileges = Number(privileges) > Number(bitRecord['uniqueRoles']) ? privileges : bitRecord['uniqueRoles'];
          else missing.push('uniqueRoles');
        }
      }
    }
    const forbiddenUser: boolean =
      this.privileges.forbiddenUsers && this.privileges.forbiddenUsers.includes(interaction.user.id);
    if (forbiddenUser) missing.push('forbiddenUsers');

    if (this.privileges.uniqueUsers) {
      if (this.privileges.uniqueUsers.includes(interaction.user.id))
        privileges = Number(privileges) > Number(bitRecord['uniqueUsers']) ? privileges : bitRecord['uniqueUsers'];
      else missing.push('uniqueUsers');
    }

    const highestMissing: string = missing.sort(
      (a: CommandPrivilegesKey, b: CommandPrivilegesKey) => Number(bitRecord[b]) - Number(bitRecord[a]),
    )[0];
    const isAuth: boolean = missing.length > 0 ? Number(highestMissing) < Number(privileges) : true;
    if (!isAuth) {
      await this.context.reply(
        this.context.translate(
          'privilegesLocked',
          `${missing.length}${missing
            .map((e: CommandPrivilegesKey) => Number(bitRecord[e]))
            .reduce((acc: number, val: number) => acc + val, 0)}`,
        ),
      );
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
  public static async flowControlWall(
    client: HashiClient,
    interaction: ChatInputCommandInteraction,
    ctx: Context,
  ): Promise<boolean> {
    const command: CommandBlockValue = ctx.command;

    const activeCoolDowns: CoolDownsQueueElement[] = client.commandManager.coolDowns.values(
      interaction.user.id,
      command.id,
    );
    const activeInterfering: InterferingQueueElement[] = client.commandManager.interfering.values(
      interaction.user.id,
      ...(command.interferingCommands || []),
    );

    if (activeCoolDowns.length > 0) {
      const finishTime: string = String(activeCoolDowns[0][1] / 1000).split('.')[0];
      const translated: string = ctx.translate('activeCoolDown', command.fullName, finishTime);

      void (await ctx.reply(translated));
      return false;
    }
    if (activeInterfering.length > 0) {
      const interferingList: string = activeInterfering
        .map((i: InterferingQueueElement): string => `</${i[0]}:${i[1].commandId}>`)
        .join(', ');
      const translated: string = ctx.translate('activeInterfering', interferingList);

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
  public static async flowControlRegister(
    client: HashiClient,
    interaction: ChatInputCommandInteraction,
    commandBlock: CommandBlock,
  ): Promise<void> {
    client.commandManager.interfering.registerInterfering(
      interaction.user.id,
      commandBlock.subcommand?.fullName || commandBlock.command?.fullName,
      interaction,
    );
    client.commandManager.coolDowns.registerCoolDown(
      interaction.user.id,
      commandBlock.subcommand?.fullName || commandBlock.command?.fullName,
      commandBlock.subcommand?.coolDown ||
        commandBlock.subcommandGroup?.coolDown ||
        commandBlock.command?.coolDown ||
        0,
    );
  }

  /**
   * Launch the basic and starting verifications.
   *
   * @param client The client that instanced the event.
   * @param interaction The associated interaction.
   * @param commandBlock The hashiCommand [subclass] instance.
   * @returns If the command executed successfully.
   */
  public static async launch(
    client: HashiClient,
    interaction: ChatInputCommandInteraction,
    commandBlock: CommandBlock,
  ): Promise<COMMAND_END> {
    if (!commandBlock.subcommand && !commandBlock.command) return COMMAND_END.ERROR;
    const command: HashiSlashCommand | HashiSlashSubcommand = commandBlock.command || commandBlock.subcommand;

    let ctx: Context = new Context(client, {
      channel: interaction.channel,
      command,
      interaction,
      users: [interaction.user],
    });

    ctx.interaction = interaction;

    [commandBlock.command, ctx] = HashiSlashCommand.refreshContext(commandBlock.command, ctx);
    let flowWall: boolean = await HashiSlashCommand.flowControlWall(client, interaction, ctx);
    if (!flowWall) return COMMAND_END.ERROR;

    if (commandBlock.subcommandGroup) {
      ctx.command = commandBlock.subcommandGroup;
      command.context = ctx;
      flowWall = await HashiSlashCommand.flowControlWall(client, interaction, ctx);
      if (!flowWall) return COMMAND_END.ERROR;
    }
    if (commandBlock.subcommand) {
      ctx.command = commandBlock.subcommand;
      command.context = ctx;
      flowWall = await HashiSlashCommand.flowControlWall(client, interaction, ctx);
      if (!flowWall) return COMMAND_END.ERROR;
    }

    const authorized: boolean = await command.isAuthorized(interaction);
    if (!authorized) return COMMAND_END.ERROR;

    await HashiSlashCommand.flowControlRegister(client, interaction, commandBlock);

    let commandWall: COMMAND_END;
    commandWall = (await commandBlock.command.callback(client, interaction, ctx)) as COMMAND_END;
    if (commandWall === COMMAND_END.ERROR) return commandWall;

    if (commandBlock.subcommandGroup) {
      command.context.command = commandBlock.subcommandGroup;

      commandWall = (await commandBlock.subcommandGroup.callback(client, interaction, ctx)) as COMMAND_END;
      if (commandWall === COMMAND_END.ERROR) return commandWall;
    }

    if (commandBlock.subcommand) {
      command.context.command = commandBlock.subcommand;

      commandWall = (await commandBlock.subcommand.callback(client, interaction, command.context)) as COMMAND_END;
      if (commandWall === COMMAND_END.ERROR) return commandWall;
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
  private static refreshContext(commandBlockValue: CommandBlockValue, context: Context): [CommandBlockValue, Context] {
    context.command = commandBlockValue;
    commandBlockValue.context = context;
    return [commandBlockValue, context];
  }
}
