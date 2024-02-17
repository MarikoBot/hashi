import { BaseClient } from './';
import { HashiClient } from '../root/';

/**
 * The class who manages the translations in the project.
 */
export class LanguageManager extends BaseClient {
  /**
   * The constructor of the language manager.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    super(client);
  }

  /**
   * Get a string from the root.
   * @param languageId The language to get the translation from.
   * @param key The string to get the translation from.
   * @returns The translated string.
   */
  public getStr(languageId: Language, key: LanguageContentKey): LanguageContent[Language] {
    return Languages[languageId][key];
  }
}

/**
 * All the language content.
 */
export const Languages: Record<Language, LanguageContent> = {
  fr: require('../strings/Fr'),
  en: require('../strings/En'),
};

/**
 * The id of a language.
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
