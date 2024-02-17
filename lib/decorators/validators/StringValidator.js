"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValidator = void 0;
const base_1 = require("../../base");
const root_1 = require("../../root");
/**
 * All the string type validators.
 */
class StringValidator {
    /**
     * The valid regular expression for an id.
     */
    static validIdRegExp = /^[a-zA-Z_0-9][a-zA-Z0-9_ ]{2,62}[a-zA-Z_0-9]$/g;
    /**
     * The valid regular expression for a non-formatted text.
     */
    static validNonFormattedRegExp = /^.{4,}$/g;
    /**
     * The valid regular expression for a primary keys set.
     */
    static validPrimaryKeysRegExp = /^[a-zA-Z0-9][a-zA-Z0-9+_ ]{2,62}[a-zA-Z0-9]$/g;
    /**
     * The valid regular expression for a version.
     */
    static validVersionRegExp = /^([0-9]+.){2}([0-9]+)(-_[a-z]{2,})?$/g;
    /**
     * Verify if a string is included into the HashiCommandType type.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static IsHashiCommandType(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || !root_1.HashiCommandValues.includes(newValue))
                throw new Error(`The property ${target.constructor.name}.${key} must be a HashiCommandType string.`);
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
     * Verify if a string is not empty.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static NotEmpty(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || newValue.trim() === '')
                throw new Error(`The property ${target.constructor.name}.${key} must be a non-empty string.`);
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
     * Verify if a string respects the syntax for an id.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidId(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || newValue.match(StringValidator.validIdRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid id string ` +
                    `(${StringValidator.validIdRegExp.toString()}).`);
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
     * Verify if a value is a valid language id.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidLanguage(target, key) {
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
    /**
     * Verify if a string respects the syntax for a non-formatted string.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidNonFormatted(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || newValue.match(StringValidator.validNonFormattedRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid id string ` +
                    `(${StringValidator.validNonFormattedRegExp.toString()}).`);
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
     * Verify if a string respects the syntax for a set of primary keys.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidPrimaryKeys(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || newValue.match(StringValidator.validPrimaryKeysRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid primary keys string ` +
                    `(${StringValidator.validPrimaryKeysRegExp.toString()}).`);
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
     * Verify if a string respects the syntax for a version.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidVersion(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || newValue.match(StringValidator.validVersionRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid version string ` +
                    `(${StringValidator.validVersionRegExp.toString()}).`);
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
exports.StringValidator = StringValidator;
