"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayValidator = void 0;
const discord_js_1 = require("discord.js");
/**
 * All the array type validators.
 */
class ArrayValidator {
    /**
     * Verify if an array is composed only of users.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyUsers(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !newValue?.every((v) => v instanceof discord_js_1.User))
                throw new Error(`The property ${target.constructor.name}.${key} must be an User-only array.`);
            value = newValue;
        };
        Object.defineProperty(target, key, {
            get: () => value,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
    /**
     * Verify if an array is composed only of enumeration values.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyEnumValues(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                !newValue?.every((v) => typeof v === 'string' || typeof v === 'number'))
                throw new Error(`The property ${target.constructor.name}.${key} must be an enumeration-values-only array.`);
            value = newValue;
        };
        Object.defineProperty(target, key, {
            get: () => value,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
}
exports.ArrayValidator = ArrayValidator;
