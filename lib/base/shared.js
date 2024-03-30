"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = exports.DATAMAP_INTENTS = void 0;
/**
 * The list of flags for the data map intents.
 */
var DATAMAP_INTENTS;
(function (DATAMAP_INTENTS) {
    /**
     * If the data map is used for store the most important data (as process data).
     */
    DATAMAP_INTENTS[DATAMAP_INTENTS["CORE"] = 0] = "CORE";
})(DATAMAP_INTENTS || (exports.DATAMAP_INTENTS = DATAMAP_INTENTS = {}));
/**
 * All the language content.
 */
exports.Languages = {
    fr: require('../strings/Fr'),
    en: require('../strings/En'),
};
