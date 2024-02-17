"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValidator = void 0;
const discord_js_1 = require("discord.js");
const base_1 = require("../../base");
const root_1 = require("../../root");
/**
 * All the object type validators.
 */
class ObjectValidator {
    /**
     * Verify if a value is an CommandBlockValue initial type instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static CommandBlockValueInitial(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                (!(newValue instanceof root_1.HashiMessageCommand) &&
                    !(newValue instanceof root_1.HashiSlashCommand) &&
                    !(newValue instanceof root_1.HashiSlashSubcommand) &&
                    !(newValue instanceof root_1.HashiSlashSubcommandGroup)))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of one of the CommandBlockValue initial type classes.`);
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
     * Verify if a value is an ContextChannel initial type instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ContextChannelInitial(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                (!(newValue instanceof discord_js_1.BaseGuildTextChannel) &&
                    !(newValue instanceof discord_js_1.BaseGuildVoiceChannel) &&
                    !(newValue instanceof discord_js_1.ThreadChannel)))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of one of the ContextChannel initial type classes.`);
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
     * Verify if the value is a dataMapDefinition object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static IsDataMapDefinition(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                !('name' in newValue) ||
                !('entry' in newValue) ||
                !('schema' in newValue) ||
                !('defaultValues' in newValue))
                throw new Error(`The property ${target.constructor.name}.${key} must be a dataMapDefinition object.`);
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
     * Verify if the value is a class instance.
     * @param constructable The class the value shall inherit.
     * @constructor
     */
    static IsInstanceOf(constructable) {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'object' || !(newValue instanceof constructable))
                    throw new Error(`The property ${target.constructor.name}.${key} must be an instance of ${constructable.prototype.name}.`);
                value = newValue;
            };
            Object.defineProperty(target, key, {
                get: () => value,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        };
    }
    /**
     * Verify if the value is an object string-dataMap.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyDataMapPair(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' && _value instanceof base_1.DataMap))
                throw new Error(`The property ${target.constructor.name}.${key} must be an object string-dataMap.`);
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
     * Verify if the value is an object string-functions[].
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyFunctionPair(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' && typeof _value === 'function'))
                throw new Error(`The property ${target.constructor.name}.${key} must be an object string-functions[].`);
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
     * Verify if the value is an object string-object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyObjectPair(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' && typeof _value === 'object'))
                throw new Error(`The property ${target.constructor.name}.${key} must be an object string-object.`);
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
     * Verify if the value is an object string-service.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyServicePair(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' && _value instanceof base_1.Service))
                throw new Error(`The property ${target.constructor.name}.${key} must be an object string-service.`);
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
     * Verify if the value is an object string-string[].
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyStringArrayPair(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' &&
                    typeof _value === 'object' &&
                    _value.every((v) => typeof v === 'string')))
                throw new Error(`The property ${target.constructor.name}.${key} must be an object string-string[].`);
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
     * Verify if the value is an object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static Matches(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object')
                throw new Error(`The property ${target.constructor.name}.${key} must be an object.`);
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
exports.ObjectValidator = ObjectValidator;
