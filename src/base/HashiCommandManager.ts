import { APIApplicationCommand, ChatInputCommandInteraction, Collection } from 'discord.js';
import { BaseClient } from './';
import { Validators, InstanceValidatorReturner, InstanceInjector, HashiCommandInjectorTarget } from '../decorators';
import {
  AnyCommandConstructorType,
  CommandGroup,
  CommandMetadata,
  CoolDownManager,
  HashiClient,
  HashiSlashCommand,
  HashiSlashSubcommand,
  HashiSlashSubcommandGroup,
  InterferingManager,
} from '../root';

/**
 * Represents the command manager of the client. This class manages the slash and message commands for the project.
 */
export class HashiCommandManager extends BaseClient {
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
   * The list of discord commands data.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(Collection))
  public readonly discordCommandsData: APIApplicationCommand[] = [];

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

  // noinspection JSUnusedGlobalSymbols
  /**
   * The decorator to inject metadata into the constructor of HashiCommandBase.
   * @param metadata The metadata of the command.
   * @returns The decorator.
   */
  public hashiCommandInjector(metadata: CommandMetadata): InstanceInjector {
    const instance: HashiCommandManager = this;
    return function (target: HashiCommandInjectorTarget): void {
      instance.client.logger.info(`Bound command: ${metadata.id}`);

      for (const key of Object.keys(metadata)) target.prototype[key] = metadata[key];

      const isMessage: boolean = target.prototype.type === 'message';
      instance.commandsList.set(`${isMessage ? 'message' : ''}${target.prototype.id}`, target.prototype.id);

      if (!isMessage) {
        if (!('src' in target.prototype))
          throw new Error(`A slash-based command shall have a 'src' property into its metadata.`);

        const discordDataOnly: APIApplicationCommand = target.prototype.src;
        instance.discordCommandsData.push(discordDataOnly);
      }

      instance.commandsList.set(metadata.id, <AnyCommandConstructorType>target);
    };
  }
}
