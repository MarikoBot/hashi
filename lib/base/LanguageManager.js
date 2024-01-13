"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageManager = exports.Languages = void 0;
const Base_1 = require("./Base");
/**
 * All the language content.
 */
exports.Languages = {
    fr: require('../strings/Fr'),
    en: require('../strings/En'),
};
/**
 * The class who manages the translations in the project.
 */
class LanguageManager extends Base_1.Base {
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
