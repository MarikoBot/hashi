"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValidator = void 0;
const base_1 = require("../../base");
/**
 * All the object type validators.
 */
class ObjectValidator {
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
