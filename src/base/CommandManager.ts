import {
  ChatInputCommandInteraction,
  Collection,
  Message,
  APIApplicationCommand,
  ApplicationCommandDataResolvable,
} from 'discord.js';
import { Base } from './';
import {
  CoolDownManager,
  FileManager,
  HashiClient,
  HashiMessageCommand,
  HashiSlashCommand,
  HashiSlashSubcommand,
  HashiSlashSubcommandGroup,
  InterferingManager,
  CommandBlock,
  AnyCommandConstructor,
} from '../root/';

/**
 * Represents the command manager of the client.
 */
export class CommandManager extends Base {
  /**
   * The cool downs' manager instance, to get access to the different delays of the current command.
   */
  readonly #coolDowns: CoolDownManager = new CoolDownManager();

  /**
   * The interfering manager instance, to have access to the different executing commands.
   */
  readonly #interfering: InterferingManager = new InterferingManager();

  /**
   * The list of commands.
   */
  readonly #commandsList: Collection<string, AnyCommandConstructor> = new Collection<string, AnyCommandConstructor>();

  /**
   * Get the cool downs' manager.
   * @returns The cool downs' manager.
   */
  get coolDowns(): CoolDownManager {
    return this.#coolDowns;
  }

  /**
   * Get the interfering manager.
   * @returns The interfering manager.
   */
  get interfering(): InterferingManager {
    return this.#interfering;
  }

  /**
   * Get the list of commands.
   * @returns The list of commands.
   */
  get commandsList(): Collection<string, AnyCommandConstructor> {
    return this.#commandsList;
  }

  /**
   * The constructor of the command manager.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    super(client);
  }

  /**
   * Add a command to the client (the bot) using the name, options and or the command itself.
   * If no command is passed, the function creates one based on the data passed.
   * @param commandData The options passed (name, command options, command instance).
   * @returns The command manager instance (this).
   */
  public addCommand(commandData: AnyCommandConstructor): CommandManager {
    this.commandsList.set(commandData.prototype.id, commandData);
    return this;
  }

  /**
   * Get a command from the cache with the name.
   * @param interaction The interaction.
   * @returns The found command instance, or undefined.
   */
  public getCommandFromInteraction(interaction: ChatInputCommandInteraction): CommandBlock {
    let command: HashiSlashCommand = <HashiSlashCommand>new (this.commandsList.get(interaction.commandName))();

    const commandSubcommandGroupOption: string = command.subcommandGroups.length
      ? interaction.options.getSubcommandGroup()
      : null;
    const commandSubcommandOption: string = command.subcommands.length ? interaction.options.getSubcommand() : null;

    let subcommandGroup: HashiSlashSubcommandGroup;
    let subcommand: HashiSlashSubcommand;

    if (commandSubcommandGroupOption) {
      subcommandGroup = command.subcommandGroups
        .map((group: typeof HashiSlashSubcommandGroup) => new group())
        .filter((group: HashiSlashSubcommandGroup): boolean => group.id === commandSubcommandGroupOption)
        ?.at(0);
      subcommand = subcommandGroup.subcommands
        .map((group: typeof HashiSlashSubcommand) => new group())
        .filter((cmd: HashiSlashSubcommand): boolean => cmd.id === commandSubcommandOption)
        ?.at(0);

      subcommandGroup.client = this.client;
      subcommand.client = this.client;
    } else if (commandSubcommandOption) {
      subcommand = command.subcommands
        .map((group: typeof HashiSlashSubcommand) => new group())
        .filter((cmd: HashiSlashSubcommand): boolean => cmd.id === commandSubcommandOption)
        ?.at(0);

      subcommand.client = this.client;
    }

    command.client = this.client;

    return { command, subcommand, subcommandGroup };
  }

  /**
   * Returns a message command from a message create event. Cached commands only.
   * @param message The message.
   * @returns The found command instance, or undefined.
   */
  public getCommandFromMessage(message: Message): CommandBlock {
    let command: HashiMessageCommand = <HashiMessageCommand>new (this.commandsList.get(message.content))();
    return { command, subcommand: command };
  }

  /**
   * Load the commands from the given commands directory.
   * @returns Nothing.
   */
  public async loadCommands(): Promise<void> {
    const commandFiles: [string, typeof HashiSlashCommand][] = this.client.fileManager.read<typeof HashiSlashCommand>(
      `${FileManager.ABSPATH}${this.client.commandsDir}`,
      `${FileManager.RMPATH}${this.client.commandsDir}`,
    );

    const commands: APIApplicationCommand[] = [];
    let commandData: typeof HashiSlashCommand;

    for (const file of commandFiles) {
      commandData = file[1];

      this.client.commandManager.commandsList.set(commandData.prototype.id, commandData);

      const discordDataOnly: APIApplicationCommand = commandData.prototype.src;
      commands.push(discordDataOnly);
    }

    void (await this.client.src.application.commands.set(<readonly ApplicationCommandDataResolvable[]>commands));
  }
}
