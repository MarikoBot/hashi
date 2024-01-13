// noinspection JSUnusedGlobalSymbols

import {
  ApplicationCommandOptionBase,
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  DiscordAPIError,
  DiscordjsError,
  GuildMemberRoleManager,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from 'discord.js';
import { Context } from './Context';
import { HashiClient } from './HashiClient';
import { HashiSlashCommand } from './HashiSlashCommand';
import { CoolDownsQueueElement } from './CoolDownManager';
import { InterferingQueueElement } from './InterferingManager';
import { CommandBlock, CommandBlockValue } from './CommandManager';
import { HashiSlashSubcommand } from './HashiSlashSubcommand';
import { HashiSlashSubcommandGroup } from './HashiSlashSubcommandGroup';

/**
 * Represents an error.
 */
export type HashiError = Error | DiscordjsError | DiscordAPIError;

/**
 * The value that is returned when the command is finished.
 */
export enum COMMAND_END {
  /**
   * When the command terminates goodly.
   */
  SUCCESS = 0,
  /**
   * When the command did not terminate.
   */
  ERROR = 1,
  /**
   * When the command terminates but with some problems that occurred in the process.
   */
  ISSUED = 1,
}

/**
 * Represents the function called back when the command is triggered.
 *
 * @param client The client that instanced the process.
 * @param interaction The associated interaction.
 * @param context The front-end class to manage interactions.
 * @returns COMMAND_END The exit command code.
 */
export type HashiSlashCommandCallbackFunction = (
  client: HashiClient,
  interaction: ChatInputCommandInteraction,
  context: Context,
) => Promise<COMMAND_END>;

/**
 * The default callback function.
 *
 * @param client The client that instanced the process.
 * @param interaction The associated interaction.
 * @param context The front-end class to manage interactions.
 * @returns COMMAND_END The exit command code.
 */
export const defaultCommandCallback = async (
  client: HashiClient,
  interaction: ChatInputCommandInteraction,
  context: Context,
): Promise<COMMAND_END> => {
  void client;
  void interaction;
  return context.command.end();
};

/**
 * The privileges for a command (restrictions and prohibition).
 */
export interface CommandPrivileges {
  /**
   * If the command is forbidden in some specific channels.
   */
  forbiddenChannels?: string[];
  /**
   * If the command is forbidden for some specific users.
   */
  forbiddenUsers?: string[];
  /**
   * If the command is forbidden for some specific roles.
   */
  forbiddenRoles?: string[];
  /**
   * If the command is forbidden for some specific guilds.
   */
  forbiddenGuilds?: string[];
  /**
   * If the command is only allowed in some specific channels only.
   */
  uniqueChannels?: string[];
  /**
   * If the command is only allowed by some specific users only.
   */
  uniqueUsers?: string[];
  /**
   * If the command is only allowed by some specific roles only.
   */
  uniqueRoles?: string[];
  /**
   * If the command is only allowed in some specific guilds only.
   */
  uniqueGuilds?: string[];
}

/**
 * The type that represents a key included in CommandPrivileges.
 */
export type CommandPrivilegesKey = keyof CommandPrivileges;

/**
 * The class who represents a base-command for the Hashi package. Extends the SlashCommandBuilder class from Discord.js.
 */
export class HashiSlashBaseCommand extends SlashCommandBuilder {
  /**
   * The client instance.
   */
  #client: HashiClient;

  /**
   * The list of errors for the command occurrence.
   */
  #errors: HashiError[] = [];

  /**
   * The commands that must be executed before this one.
   * If one of the interfering commands is same-time running, this command will be ignored.
   */
  #interferingCommands: ChatInputApplicationCommandData['name'][] = [];

  /**
   * The amount of time before running the command again. Must be between 0 and 300 seconds.
   */
  #coolDown: number = 0;

  /**
   * The command full name defined by the subcommands and subcommand groups.
   */
  #fullName: this['name'];

  /**
   * The context of the command.
   */
  #context: Context;

  /**
   * The external data for the command.
   */
  #privileges: CommandPrivileges = {};

  /**
   * The callback function called.
   */
  #callback: HashiSlashCommandCallbackFunction = defaultCommandCallback;

  /**
   * Get the client.
   * @returns The client.
   */
  get client(): HashiClient {
    return this.#client;
  }

  /**
   * Get the errors.
   * @returns The errors.
   */
  get errors(): HashiError[] {
    return this.#errors;
  }

  /**
   * Get the interfering commands.
   * @returns The interfering commands.
   */
  get interferingCommands(): string[] {
    return this.#interferingCommands;
  }

  /**
   * Get the cool down.
   * @returns The cool down.
   */
  get coolDown(): number {
    return this.#coolDown;
  }

  /**
   * Get the full name.
   * @returns The full name.
   */
  get fullName(): string {
    return this.#fullName;
  }

  /**
   * Get the context.
   * @returns The context.
   */
  get context(): Context {
    return this.#context;
  }

  /**
   * Get the privileges.
   * @returns The privileges.
   */
  get privileges(): CommandPrivileges {
    return this.#privileges;
  }

  /**
   * Get the callback.
   * @returns The callback.
   */
  get callback(): HashiSlashCommandCallbackFunction {
    return this.#callback;
  }

  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor(name: SlashCommandBuilder['name']) {
    super();
    this.setName(name);
  }

  /**
   * Set the client for the event to be successfully executed.
   * @param client The client instance.
   * @returns The class instance.
   */
  public setClient(client: HashiClient): HashiSlashBaseCommand {
    if (client instanceof HashiClient) this.#client = client;
    return this;
  }

  /**
   * Delete the client.
   * @returns The class instance.
   */
  public clearClient(): HashiSlashBaseCommand {
    this.#client = null;
    return this;
  }

  /**
   * The interfering commands to set for the command.
   * @param interfering The interfering commands to set.
   * @returns The class instance.
   */
  public setInterferingCommands(interfering: string[]): HashiSlashBaseCommand {
    if (interfering.every((interf: string): boolean => typeof interf === 'string'))
      this.#interferingCommands = interfering;
    return this;
  }

  /**
   * The cool down to set for the command.
   * @param coolDown The cool down to set.
   * @returns The class instance.
   */
  public setCoolDown(coolDown: number): HashiSlashBaseCommand {
    if (typeof coolDown === 'number') this.#coolDown = coolDown;
    return this;
  }

  /**
   * The full name to set for the command.
   * @param fullName The full name to set.
   * @returns The class instance.
   */
  public setFullName(fullName: string): HashiSlashBaseCommand {
    if (typeof fullName === 'string') this.#fullName = fullName;
    return this;
  }

  /**
   * The context to set for the command.
   * @param context The context to set.
   * @returns The class instance.
   */
  public setContext(context: Context): HashiSlashBaseCommand {
    if (typeof context === 'object') this.#context = context;
    return this;
  }

  /**
   * Delete the context.
   * @returns The class instance.
   */
  public clearContext(): HashiSlashBaseCommand {
    this.#context = null;
    return this;
  }

  /**
   * The privileges to set for the command.
   * @param privileges The privileges to set.
   * @returns The class instance.
   */
  public setPrivileges(privileges: CommandPrivileges): HashiSlashBaseCommand {
    if (typeof privileges === 'object') this.#privileges = privileges;
    return this;
  }

  /**
   * The callback function executed when the command is triggered.
   *
   * @param callback The function to set.
   * @returns The class instance.
   */
  public setCallbackFunction(callback: HashiSlashCommandCallbackFunction): HashiSlashBaseCommand {
    if (typeof callback === 'function') this.#callback = callback;
    return this;
  }

  /**
   * Add a privilege to the command (type restriction).
   *
   * @param place The place where the restriction acts.
   * @param values The values to set for this restriction (ERASE THE EXISTING ONES).
   * @returns Nothing.
   */
  public addRestrictions(place: 'Channels' | 'Users' | 'Roles' | 'Guilds', values: string[]): void {
    this.privileges[`unique${place}`] = values;
  }

  /**
   * Add a privilege to the command (type prohibition).
   *
   * @param place The place where the prohibition acts.
   * @param values The values to set for this prohibition (ERASE THE EXISTING ONES).
   * @returns Nothing.
   */
  public addProhibitions(place: 'Channels' | 'Users' | 'Roles' | 'Guilds', values: string[]): void {
    this.privileges[`unique${place}`] = values;
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
   * Add the error to the list of errors. Permits to determine the final end-of-process code.
   *
   * @param error The error to add.
   * @returns Nothing.
   */
  public catch(error: HashiError): void {
    this.errors.push(error);
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
      command.fullName,
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
    const command: HashiSlashSubcommand | HashiSlashCommand = commandBlock.subcommand || commandBlock.command;

    let ctx: Context = new Context(client, {
      channel: interaction.channel,
      command,
      interaction,
      users: [interaction.user],
    });

    ctx.setInteraction(interaction);

    [<CommandBlockValue>commandBlock.command, ctx] = HashiSlashBaseCommand.refreshContext(commandBlock.command, ctx);
    let flowWall: boolean = await HashiSlashBaseCommand.flowControlWall(client, interaction, ctx);
    if (!flowWall) return COMMAND_END.ERROR;

    if (commandBlock.subcommandGroup) {
      ctx.setCommand(commandBlock.subcommandGroup);
      command.setContext(ctx);
      flowWall = await HashiSlashBaseCommand.flowControlWall(client, interaction, ctx);
      if (!flowWall) return COMMAND_END.ERROR;
    }
    if (commandBlock.subcommand) {
      ctx.setCommand(commandBlock.subcommand);
      command.setContext(ctx);
      flowWall = await HashiSlashBaseCommand.flowControlWall(client, interaction, ctx);
      if (!flowWall) return COMMAND_END.ERROR;
    }

    const authorized: boolean = await command.isAuthorized(interaction);
    if (!authorized) return COMMAND_END.ERROR;

    await HashiSlashBaseCommand.flowControlRegister(client, interaction, commandBlock);

    let commandWall: COMMAND_END;
    commandWall = (await commandBlock.command.callback(client, interaction, ctx)) as COMMAND_END;
    if (commandWall === COMMAND_END.ERROR) return commandWall;

    if (commandBlock.subcommandGroup) {
      command.context.setCommand(commandBlock.subcommandGroup);

      commandWall = (await commandBlock.subcommandGroup.callback(client, interaction, ctx)) as COMMAND_END;
      if (commandWall === COMMAND_END.ERROR) return commandWall;
    }

    if (commandBlock.subcommand) {
      command.context.setCommand(commandBlock.subcommand);

      commandWall = (await commandBlock.subcommand.callback(client, interaction, command.context)) as COMMAND_END;
      if (commandWall === COMMAND_END.ERROR) return commandWall;
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
  public static transformSubcommand(
    source: HashiSlashCommand | HashiSlashSubcommandGroup,
    subcommand: HashiSlashSubcommand,
  ): void {
    const subBuilder: SlashCommandSubcommandBuilder = new SlashCommandSubcommandBuilder();
    subBuilder.setName(subcommand.name);
    subBuilder.setDescription(subcommand.description);
    subBuilder.setNameLocalizations(subcommand.name_localizations || {});
    subBuilder.setDescriptionLocalizations(subcommand.name_localizations || {});

    if (subcommand.options.length > 0) {
      let i: number = -1;
      while (++i < subcommand.options.length)
        subBuilder.options.push(<ApplicationCommandOptionBase>subcommand.options[i].toJSON());
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
  public static transformSubcommandGroup(source: HashiSlashCommand, subcommandGroup: HashiSlashSubcommandGroup): void {
    const subGroupBuilder: SlashCommandSubcommandGroupBuilder = new SlashCommandSubcommandGroupBuilder();
    subGroupBuilder.setName(subcommandGroup.name);
    subGroupBuilder.setDescription(subcommandGroup.description);
    subGroupBuilder.setNameLocalizations(subcommandGroup.name_localizations || {});
    subGroupBuilder.setDescriptionLocalizations(subcommandGroup.name_localizations || {});

    let i: number = -1;
    let subcommand: HashiSlashSubcommand;
    let subBuilder: SlashCommandSubcommandBuilder;

    while (++i < subcommandGroup.hashiSubcommands.length) {
      subcommand = subcommandGroup.hashiSubcommands[i];
      subcommand.setFullName(`${this.name} ${subcommand.name}`);

      subBuilder = new SlashCommandSubcommandBuilder();
      subBuilder.setName(subcommand.name);
      subBuilder.setNameLocalizations(subcommand.name_localizations || {});
      subBuilder.setDescription(subcommand.description);
      subBuilder.setDescriptionLocalizations(subcommand.name_localizations || {});

      if (subcommand.options.length > 0) {
        let j: number = -1;
        while (++j < subcommand.options.length)
          subBuilder.options.push(<ApplicationCommandOptionBase>subcommand.options[j].toJSON());
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
  private static refreshContext(commandBlockValue: CommandBlockValue, context: Context): [CommandBlockValue, Context] {
    context.setCommand(commandBlockValue);
    commandBlockValue.setContext(context);
    return [commandBlockValue, context];
  }
}
