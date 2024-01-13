import { HashiSlashBaseCommand } from './HashiSlashBaseCommand';
import { HashiSlashSubcommand } from './HashiSlashSubcommand';
import { HashiSlashSubcommandGroup } from './HashiSlashSubcommandGroup';

/**
 * The main class who represents a command for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
export class HashiSlashCommand extends HashiSlashBaseCommand {
  /**
   * The list of hashi subcommands.
   */
  readonly #hashiSubcommands: HashiSlashSubcommand[] = [];

  /**
   * The list of hashi subcommand groups.
   */
  readonly #hashiSubcommandsGroups: HashiSlashSubcommandGroup[] = [];

  /**
   * Get the list of hashi subcommands.
   * @returns The list of hashi subcommands.
   */
  get hashiSubcommands(): HashiSlashSubcommand[] {
    return this.#hashiSubcommands;
  }

  /**
   * Get the list of hashi subcommand groups.
   * @returns The list of hashi subcommand groups.
   */
  get hashiSubcommandsGroups(): HashiSlashSubcommandGroup[] {
    return this.#hashiSubcommandsGroups;
  }

  /**
   * The constructor for the HashiSlashCommand.
   * @param name The name of the command.
   */
  constructor(name: HashiSlashBaseCommand['name']) {
    super(name);
    this.setFullName(name);
  }

  /**
   * Add a slash command built with the Hashi source builder.
   * @param subcommand The slash command instance to add.
   * @returns The class instance.
   */
  public addHashiSlashSubcommand(subcommand: HashiSlashSubcommand): this {
    subcommand.setFullName(`${this.name} ${subcommand.name}`);
    HashiSlashBaseCommand.transformSubcommand(this, subcommand);
    this.hashiSubcommands.push(subcommand);
    return this;
  }

  /**
   * Add a slash command built with the Hashi source builder.
   * @param subcommandGroup The slash command group instance to add.
   * @returns The class instance.
   */
  public addHashiSlashSubcommandGroup(subcommandGroup: HashiSlashSubcommandGroup): this {
    subcommandGroup.setFullName(`${this.name} ${subcommandGroup.name}`);
    HashiSlashBaseCommand.transformSubcommandGroup(this, subcommandGroup);
    this.hashiSubcommandsGroups.push(subcommandGroup);
    return this;
  }
}
