import { BaseClient, Language, LanguageContent, LanguageContentKey, Languages } from './';
import { HashiClient } from '../root';

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
