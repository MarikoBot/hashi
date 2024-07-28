"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ArrayValidator.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:28 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:48:57 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayValidator = void 0;
const discord_js_1 = require("discord.js");
/**
 * All the array type
 */
exports.ArrayValidator = {
    /**
     * Verify if an array is composed only of objects.
     * @param target The class instance.
     * @param key The attribute to set.
     */
    OnlyObjects: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                (newValue instanceof Array &&
                    !newValue?.every((value) => typeof value === 'object')))
                throw new Error(`The property ${target.constructor.name}.${key} must be an object-only array.`);
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
     * Verify if an array is composed only of enumeration values.
     * @param target The class instance.
     * @param key The attribute to set.
     */
    OnlyEnumValues: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                (newValue instanceof Array &&
                    !newValue?.every((value) => typeof value === 'string' || typeof value === 'number')))
                throw new Error(`The property ${target.constructor.name}.${key} must be an ` +
                    `enumeration-values-only array.`);
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
     * Verify if an array is composed only of HashiErrors initials classes instances.
     * @param target The class instance.
     * @param key The attribute to set.
     */
    OnlyHashiErrors: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                (newValue instanceof Array &&
                    !newValue?.every((value) => !(value instanceof Error) &&
                        !(value instanceof discord_js_1.DiscordjsError) &&
                        !(value instanceof discord_js_1.DiscordAPIError))))
                throw new Error(`The property ${target.constructor.name}.${key} must be an ` +
                    `HashiErrors-initials-classes-instances array.`);
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
     * Verify if an array is composed only of users.
     * @param target The class instance.
     * @param key The attribute to set.
     */
    OnlyUsers: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'object' ||
                (newValue instanceof Array &&
                    !newValue?.every((value) => value instanceof discord_js_1.User)))
                throw new Error(`The property ${target.constructor.name}.${key} must be an User-only array.`);
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
