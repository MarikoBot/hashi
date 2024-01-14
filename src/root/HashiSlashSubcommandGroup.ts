import { HashiSlashBaseCommand, HashiSlashCommandCallbackFunction } from './HashiSlashBaseCommand';
import { SlashCommandSubcommandGroupBuilder } from 'discord.js';
import { HashiSlashSubcommand } from './HashiSlashSubcommand';

/**
 * The main class who represents a subcommand group for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
export class HashiSlashSubcommandGroup extends HashiSlashBaseCommand {
  /**
   * The list of hashi subcommands.
   */
  readonly #hashiSubcommands: HashiSlashSubcommand[] = [];

  /**
   * Get the list of hashi subcommands.
   * @returns The list of hashi subcommands.
   */
  get hashiSubcommands(): HashiSlashSubcommand[] {
    return this.#hashiSubcommands;
  }

  /**
   * The constructor for the HashiSlashCommand.
   * @param name The subcommand group name.
   */
  constructor(name: SlashCommandSubcommandGroupBuilder['name']) {
    super(name);
    this.setName(name);
  }

  /**
   * The callback function executed when the command is triggered.
   *
   * @param callback The function to set.
   * @returns The class instance.
   */
  public setCallbackFunction(callback: HashiSlashCommandCallbackFunction): HashiSlashSubcommandGroup {
    if (typeof callback === 'function') super.setCallbackFunction(callback);
    return this;
  }

  /**
   * Add a slash command built with the Hashi source builder.
   * @param subcommand The slash command instance to add.
   * @returns The class instance.
   */
  public addHashiSlashSubcommand(subcommand: HashiSlashSubcommand): this {
    subcommand.setFullName(`${this.fullName} ${subcommand.name}`);
    HashiSlashBaseCommand.transformSubcommand(this, subcommand);
    this.hashiSubcommands.push(subcommand);
    return this;
  }
}
