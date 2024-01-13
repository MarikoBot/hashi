import { HashiClient } from '../root/';
import { Base } from './Base';
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
/**
 * All the language content.
 */
export declare const Languages: Record<Language, LanguageContent>;
/**
 * The class who manages the translations in the project.
 */
export declare class LanguageManager extends Base {
    /**
     * The constructor of the language manager.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Get a string from the root.
     * @param languageId The language to get the translation from.
     * @param key The string to get the translation from.
     * @returns The translated string.
     */
    getStr(languageId: Language, key: LanguageContentKey): LanguageContent[Language];
}
