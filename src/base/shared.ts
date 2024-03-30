import { CommandBlockValue } from '../root';
import {
  BaseGuildTextChannel,
  BaseGuildVoiceChannel,
  ButtonInteraction,
  ChatInputCommandInteraction,
  ThreadChannel,
  User,
} from 'discord.js';
import { DataMap } from './DataMap';
import { Types } from 'mongoose';

/**
 * The options for the context constructor.
 */
export interface ContextOptions {
  /**
   * The language id of the main user.
   */
  languageId?: Language;
  /**
   * The command associated with the context.
   */
  command: CommandBlockValue;
  /**
   * The users implicated in the context/action.
   */
  users: User[];
  /**
   * The channel where the action occurs.
   */
  channel: ContextChannel;
  /**
   * The interaction, if there is one.
   */
  interaction: ChatInputCommandInteraction;
  /**
   * The interaction button, if there is one.
   */
  buttonInteraction?: ButtonInteraction;
}

/**
 * Represents the type for a context possible channel type among Discord.js library.
 */
export type ContextChannel = BaseGuildTextChannel | BaseGuildVoiceChannel | ThreadChannel;

/**
 * The list of flags for the data map intents.
 */
export enum DATAMAP_INTENTS {
  /**
   * If the data map is used for store the most important data (as process data).
   */
  CORE = 0,
}

/**
 * The type that includes all the data maps of the database.
 */
export type DataMapsObject = { [dmName: string]: DataMap<any> };

/**
 * A language id.
 */
export type Language = 'fr' | 'en';

/**
 * The default type for a language translation file.
 */
export type LanguageContent = Record<string, string>;

/**
 * The type that represents a language content id.
 */
export type LanguageContentKey = keyof LanguageContent;

/**
 * All the language content.
 */
export const Languages: Record<Language, LanguageContent> = {
  fr: require('../strings/Fr'),
  en: require('../strings/En'),
};

/**
 * A type that can be stored into a datamap.
 */
export type TypedDataMapStored =
  | number
  | string
  | boolean
  | TypedDataMapStored[]
  | { [key: string]: TypedDataMapStored }
  | undefined
  | Types.ObjectId;
