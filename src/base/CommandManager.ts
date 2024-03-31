import {
  APIApplicationCommand,
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  Collection,
} from 'discord.js';
import { BaseClient } from './';
import { Validators, InstanceValidatorReturner, InstanceInjector, HashiCommandInjectorTarget } from '../decorators';
import {
  AnyCommandConstructorType,
  CommandGroup,
  CommandMetadata,
  CoolDownManager,
  FileManager,
  HashiClient,
  HashiMessageCommand,
  HashiSlashCommand,
  HashiSlashSubcommand,
  HashiSlashSubcommandGroup,
  InterferingManager,
} from '../root';

/**
 * Represents the command manager of the client. This class manages the slash and message commands for the project.
 */
export class CommandManager extends BaseClient {
  /**
   * The cool downs' manager instance, to get access to the different delays of the current command.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(CoolDownManager))
  public readonly coolDowns: CoolDownManager = new CoolDownManager();

  /**
   * The interfering manager instance, to have access to the different executing commands.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(InterferingManager))
  public readonly interfering: InterferingManager = new InterferingManager();

  /**
   * The list of commands.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(Collection))
  public readonly commandsList: Collection<string, AnyCommandConstructorType> = new Collection<
    string,
    AnyCommandConstructorType
  >();

  /**
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    super(client);
  }

  /**
   * Get a slash command from the cache with the name.
   * @param interaction The interaction.
   * @returns The found command instance, or undefined.
   */
  public getCommandFromInteraction(interaction: ChatInputCommandInteraction): CommandGroup {
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
   * Load the commands from the given commands directory.
   * @param dirName The directory to load on.
   * @returns Nothing.
   */
  private async commandsScraper<T extends AnyCommandConstructorType>(dirName: string): Promise<void> {
    const commandFiles: [string, T][] = this.client.fileManager.read<T>(
      `${FileManager.ABSPATH}${dirName}`,
      `${FileManager.RMPATH}${dirName}`,
    );

    const commands: APIApplicationCommand[] = [];
    let commandData: T;
    let isMessage: boolean = false;

    for (const file of commandFiles) {
      commandData = file[1][file[0]];
      isMessage = commandData.prototype.type === 'message';

      this.client.commandManager.commandsList.set(
        `${isMessage ? 'message' : ''}${commandData.prototype.id}`,
        commandData,
      );

      if (!isMessage) {
        if (!('src' in commandData.prototype))
          throw new Error(`A slash-based command shall have a 'src' property into its metadata.`);

        const discordDataOnly: APIApplicationCommand = commandData.prototype.src;
        commands.push(discordDataOnly);
      }
    }

    void (await this.client.src.application.commands.set(<readonly ApplicationCommandDataResolvable[]>commands));
  }

  /**
   * Load the commands from the given commands directory.
   * @returns Nothing.
   */
  public async loadCommands(): Promise<void> {
    await this.commandsScraper<typeof HashiMessageCommand>(`${this.client.commandsDir}/message`);
    await this.commandsScraper<typeof HashiSlashCommand>(`${this.client.commandsDir}/slash`);
  }

  /**
   * The decorator to inject metadata into the constructor of an extension of HashiCommandBase.
   * @param metadata The metadata of the super-HashiCommandBase.
   * @returns The decorator.
   */
  public HashiCommandInjector(metadata: CommandMetadata): InstanceInjector {
    return function (target: HashiCommandInjectorTarget): void {
      for (const [key, value] of Object.entries(metadata)) target.prototype[key] = value;
    };
  }
}
