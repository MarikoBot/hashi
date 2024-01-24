"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValidator = void 0;
/**
 * All the string type validators.
 */
class StringValidator {
    /**
     * The valid regular expression for an id.
     */
    static validIdRegExp = /[a-zA-Z_0-9][a-zA-Z _0-9]{1,62}[a-zA-Z_0-9]/g;
    /**
     * The valid regular expression for a primary keys set.
     */
    static validPrimaryKeysRegExp = /[a-zA-Z_0-9][a-zA-Z _0-9+]{1,62}[a-zA-Z_0-9]/g;
    /**
     * The valid regular expression for a version.
     */
    static validVersionRegExp = /([0-9]+.){2}([0-9]+)(-[a-z]{2,})+/g;
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
