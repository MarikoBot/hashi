// noinspection JSUnusedGlobalSymbols

import { ChatInputCommandInteraction, APIApplicationCommand } from 'discord.js';
import { Context } from '../base/';
import { CommandAncillary, HashiClient, HashiSlashSubcommand, HashiSlashSubcommandGroup, COMMAND_END } from './';

/**
 * The class who represents a base-command for the Hashi package.
 */
export class HashiSlashCommand extends CommandAncillary {
  /**
   * The Discord slash command data. PROVIDE THE SUBCOMMANDS(GROUPS) DATA.
   */
  public src: APIApplicationCommand;

  /**
   * The subcommand groups of the command.
   */
  public subcommandGroups: (typeof HashiSlashSubcommandGroup)[] = [];

  /**
   * The subcommands of the command.
   */
  public subcommands: (typeof HashiSlashSubcommand)[] = [];

  /**
   * The constructor for the HashiSlashCommand.
   */
  constructor() {
    super('slash');
  }
}

/**
 * The default callback function.
 *
 * @param client The client that instanced the process.
 * @param interaction The associated interaction.
 * @param context The front-end class to manage interactions.
 * @returns COMMAND_END The exit command code.
 */
export const defaultSlashCommandCallback: HashiSlashCommandCallbackFunction = async (
  client: HashiClient,
  interaction: ChatInputCommandInteraction,
  context: Context,
): Promise<COMMAND_END> => {
  void client;
  void interaction;
  return context.command.end();
};

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
