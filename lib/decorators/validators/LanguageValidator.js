"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageValidator = void 0;
const base_1 = require("../../base");
/**
 * Returns if an attribute is linked to a language.
 */
class LanguageValidator {
    /**
     * Verify if a value is a valid language id.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static IsValid(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || !Object.keys(base_1.Languages).includes(newValue))
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid language id: ${Object.keys(base_1.Languages).join(', ')}.`);
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
exports.LanguageValidator = LanguageValidator;
