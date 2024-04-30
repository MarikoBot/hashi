import { Command, CommandMetadata, DiscordEvent } from '../root';
import { ClientEvents } from 'discord.js';

/**
 * The structure of a default command feature file.
 */
export interface CommandDefaultFeature {
  /**
   * The class constructor.
   */
  default: new (...args: any[]) => any;
  /**
   * The metadata to inject (the command data).
   */
  metadata: CommandMetadata;
}

/**
 * The structure of a default event feature file.
 */
export interface EventDefaultFeature {
  /**
   * The class constructor.
   */
  default: new (...args: any[]) => any;
  /**
   * The metadata to inject (the name).
   */
  eventName: keyof ClientEvents;
}
