import { HashiSlashBaseCommand, HashiSlashCommandCallbackFunction } from './HashiSlashBaseCommand';

/**
 * The main class who represents a subcommand for the Hashi package. [Extends the SlashCommandBuilder class from Discord.js.]
 */
export class HashiSlashSubcommand extends HashiSlashBaseCommand {
  /**
   * The constructor for the HashiSlashCommand.
   * @param name The name of the subcommand.
   */
  constructor(name: HashiSlashBaseCommand['name']) {
    super(name);
  }

  /**
   * The callback function executed when the command is triggered.
   *
   * @param callback The function to set.
   * @returns The class instance.
   */
  public setCallbackFunction(callback: HashiSlashCommandCallbackFunction): HashiSlashSubcommand {
    if (typeof callback === 'function') super.setCallbackFunction(callback);
    return this;
  }
}
