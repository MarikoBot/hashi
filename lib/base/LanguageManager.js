"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = exports.LanguageManager = void 0;
const _1 = require("./");
/**
 * The class who manages the translations in the project.
 */
class LanguageManager extends _1.BaseClient {
    /**
     * The constructor of the language manager.
     * @param client The client instance.
     */
    constructor(client) {
        super(client);
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
/**
 * All the language content.
 */
exports.Languages = {
    fr: require('../strings/Fr'),
    en: require('../strings/En'),
};
