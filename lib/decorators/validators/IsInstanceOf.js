"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInstanceOf = void 0;
const discord_js_1 = require("discord.js");
const mongoose_1 = require("mongoose");
const root_1 = require("../../root");
/**
 * Returns if an attribute is an instance of a certain class.
 */
class IsInstanceOf {
    /**
     * Verify if a value is a ButtonInteraction instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ButtonInteraction(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof discord_js_1.ButtonInteraction))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of ButtonInteraction.`);
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
     * Verify if a value is a ChatInputCommandInteraction instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ChatInputCommandInteraction(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof discord_js_1.ChatInputCommandInteraction))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of ChatInputCommandInteraction.`);
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
     * Verify if a value is a Collection instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static Collection(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof discord_js_1.Collection))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of Collection.`);
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
     * Verify if a value is an CoolDownManager instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static CoolDownManager(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof root_1.CoolDownManager))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of CoolDownManager.`);
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
     * Verify if a value is an DataMapEntry instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static DataMapEntry(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof root_1.DataMapEntry))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of DataMapEntry.`);
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
     * Verify if a value is an HashiClient instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static HashiClient(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof root_1.HashiClient))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of HashiClient.`);
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
     * Verify if a value is an InterferingManager instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static InterferingManager(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof root_1.InterferingManager))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of InterferingManager.`);
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
     * Verify if a value is an Model instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static Model(target, key) {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' || !(newValue instanceof mongoose_1.Model))
                throw new Error(`The property ${target.constructor.name}.${key} must be an instance of Model.`);
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
exports.IsInstanceOf = IsInstanceOf;
