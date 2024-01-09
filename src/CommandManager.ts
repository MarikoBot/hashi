import { ChatInputCommandInteraction, Collection } from 'discord.js';
import { HashiSlashCommand } from './HashiSlashCommand';
import { CoolDownManager } from './CoolDownManager';
import { InterferingManager } from './InterferingManager';
import { HashiClient } from './HashiClient';
import { HashiSlashSubcommand } from './HashiSlashSubcommand';
import { HashiSlashSubcommandGroup } from './HashiSlashSubcommandGroup';
import * as fs from 'fs';
import * as path from 'path';

/**
 * A triplet returned when the client transforms an interaction into a callable class group.
 */
export interface CommandBlock {
  /**
   * The command.
   */
  command: HashiSlashCommand;
  /**
   * The subcommand group if there is one.
   */
  subcommandGroup: HashiSlashSubcommandGroup;
  /**
   * The subcommand if there is one.
   */
  subcommand: HashiSlashSubcommand;
}

/**
 * The type that represents an element of CommandBlock.
 */
export type CommandBlockValue = CommandBlock[keyof CommandBlock];

/**
 * Represents the command manager of the client.
 */
export class CommandManager {
  /**
   * The client instance.
   */
  readonly #client: HashiClient;
  /**
   * The client instance.
   */
  public readonly client: HashiClient;

  /**
   * The cool down manager instance, to get access to the different delays of the current command.
   */
  public readonly CoolDowns: CoolDownManager;

  /**
   * The interfering manager instance, to have access to the different executing commands.
   */
  public readonly Interfering: InterferingManager;

  /**
   * The collection of the commands.
   */
  public readonly commandsList: Collection<string, HashiSlashCommand> = new Collection();

  /**
   * The constructor of the command manager.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    this.client = client;
    this.CoolDowns = new CoolDownManager();
    this.Interfering = new InterferingManager();
  }

  /**
   * Add a command to the client (the bot) using the name, options and or the command itself.
   * If no command is passed, the function creates one based on the data passed.
   * @param commandData The options passed (name, command options, command instance).
   * @returns The command manager instance (this).
   */
  public add(commandData: HashiSlashCommand): CommandManager {
    this.commandsList.set(commandData.name, commandData);
    return this;
  }

  /**
   * Get a command from the cache with the name.
   * @param interaction The interaction.
   * @returns The found command instance, or undefined.
   */
  public getCommand(interaction: ChatInputCommandInteraction): CommandBlock {
    let command: HashiSlashCommand = this.commandsList.get(interaction.commandName);

    const commandSubcommandGroupOption: string = command.hashiSubcommandsGroups.length
      ? interaction.options.getSubcommandGroup()
      : null;
    const commandSubcommandOption: string = command.hashiSubcommands.length
      ? interaction.options.getSubcommand()
      : null;

    let subcommandGroup: HashiSlashSubcommandGroup;
    let subcommand: HashiSlashSubcommand;

    if (commandSubcommandGroupOption) {
      subcommandGroup = command.hashiSubcommandsGroups
        .filter((group: HashiSlashSubcommandGroup): boolean => group.name === commandSubcommandGroupOption)
        ?.at(0);
      subcommand = subcommandGroup.hashiSubcommands
        .filter((cmd: HashiSlashSubcommand): boolean => cmd.name === interaction.options.getSubcommand())
        ?.at(0);

      subcommandGroup.setClient(this.client);
      subcommand.setClient(this.client);
    } else if (commandSubcommandOption) {
      subcommand = command.hashiSubcommands
        .filter((cmd: HashiSlashSubcommand): boolean => cmd.name === commandSubcommandOption)
        ?.at(0);

      subcommand.setClient(this.client);
    }

    command.setClient(this.client);

    return { command, subcommand, subcommandGroup };
  }

  /**
   * Load the commands from the given commands directory.
   * @returns Nothing.
   */
  public async loadCommands(): Promise<void> {
    const files: string[] = fs.readdirSync(`lib/${this.client.commandsDir}`);
    const commands: HashiSlashCommand[] = [];

    let i: number = -1;
    let commandData: HashiSlashCommand;
    while (++i < files.length) {
      commandData = require(path.join(__dirname, `../../../../lib/${this.client.commandsDir}/${files[i]}`));
      commandData.setClient(this.client);

      this.client.CommandManager.commandsList.set(files[i].replace('.js', ''), commandData);

      const discordDataOnly: HashiSlashCommand = Object.assign(new HashiSlashCommand('default'), commandData);
      discordDataOnly.clearClient();
      discordDataOnly.clearContext();
      commands.push(discordDataOnly);
    }

    void (await this.client.src.application.commands.set(commands));
  }
}
