"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValidatorRegExp = exports.StringValidator = void 0;
/**
 * All the string type validators.
 */
exports.StringValidator = {
    /**
     * Verify if a string is included into the HashiCommandType type.
     * @param hashiCommandValues The hashiCommandValues instance.
     * @constructor
     */
    IsHashiCommandType: (hashiCommandValues) => {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'string' || !hashiCommandValues.includes(newValue))
                    throw new Error(`The property ${target.constructor.name}.${key} must be a HashiCommandType string.`);
                value = newValue;
            };
            Object.defineProperty(target, key, {
                get: () => value,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        };
    },
    /**
     * Verify if a string is not empty.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    NotEmpty: (target, key) => {
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
    },
    /**
     * Verify if a string respects the syntax for an id.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    ValidId: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' || newValue.match(exports.StringValidatorRegExp.validIdRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid id string ` +
                    `(${exports.StringValidator.validIdRegExp.toString()}).`);
            value = newValue;
        };
        Object.defineProperty(target, key, {
            get: () => value,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    },
    /**
     * Verify if a value is a valid language id.
     * @param languages The languages record.
     * @constructor
     */
    ValidLanguage: (languages) => {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'string' || !Object.keys(languages).includes(newValue))
                    throw new Error(`The property ${target.constructor.name}.${key} must be a valid language id: ${Object.keys(languages).join(', ')}.`);
                value = newValue;
            };
            Object.defineProperty(target, key, {
                get: () => value,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        };
    },
    /**
     * Verify if a string respects the syntax for a non-formatted string.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    ValidNonFormatted: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' ||
                newValue.match(exports.StringValidatorRegExp.validNonFormattedRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid id string ` +
                    `(${exports.StringValidator.validNonFormattedRegExp.toString()}).`);
            value = newValue;
        };
        Object.defineProperty(target, key, {
            get: () => value,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    },
    /**
     * Verify if a string respects the syntax for a set of primary keys.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    ValidPrimaryKeys: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' ||
                newValue.match(exports.StringValidatorRegExp.validPrimaryKeysRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid primary keys string ` +
                    `(${exports.StringValidator.validPrimaryKeysRegExp.toString()}).`);
            value = newValue;
        };
        Object.defineProperty(target, key, {
            get: () => value,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    },
    /**
     * Verify if a string respects the syntax for a version.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    ValidVersion: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'string' ||
                newValue.match(exports.StringValidatorRegExp.validVersionRegExp).join('') !== newValue)
                throw new Error(`The property ${target.constructor.name}.${key} must be a valid version string ` +
                    `(${exports.StringValidator.validVersionRegExp.toString()}).`);
            value = newValue;
        };
        Object.defineProperty(target, key, {
            get: () => value,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    },
};
/**
 * All the regular expressions for the string validator.
 */
exports.StringValidatorRegExp = {
    /**
     * The valid regular expression for an id.
     */
    validIdRegExp: /^[a-zA-Z_0-9][a-zA-Z0-9_ ]{2,62}[a-zA-Z_0-9]$/g,
    /**
     * The valid regular expression for a non-formatted text.
     */
    validNonFormattedRegExp: /^.{4,}$/g,
    /**
     * The valid regular expression for a primary keys set.
     */
    validPrimaryKeysRegExp: /^[a-zA-Z0-9][a-zA-Z0-9+_ ]{2,62}[a-zA-Z0-9]$/g,
    /**
     * The valid regular expression for a version.
     */
    validVersionRegExp: /^([0-9]+.){2}([0-9]+)(-_[a-z]{2,})?$/g,
};
