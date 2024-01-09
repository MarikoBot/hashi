"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageManager = exports.Languages = void 0;
/**
 * All the language content.
 */
exports.Languages = {
    fr: require('./strings/Fr'),
    en: require('./strings/En'),
};
/**
 * The class who manages the translations in the project.
 */
class LanguageManager {
    /**
     * The client instance.
     */
    #client;
    /**
     * Get the client instance.
     * @returns The client instance.
     */
    get client() {
        return this.#client;
    }
    /**
     * The constructor of the language manager.
     * @param client The client instance.
     */
    constructor(client) {
        this.#client = client;
    }
    /**
     * Get a string from the root.
     * @param languageId The language to get the translation from.
     * @param key The string to get the translation from.
     * @returns The translated string.
     */
    getStr(languageId, key) {
        return exports.Languages[languageId][key];
    }
}
exports.LanguageManager = LanguageManager;
