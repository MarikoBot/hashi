"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ObjectDeepValidator.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:39 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:03:15 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectDeepValidator = void 0;
/**
 * All the object type
 */
exports.ObjectDeepValidator = {
    /**
     * Verify if the value is a class instance.
     * @param constructable The class the value shall inherit.
     */
    IsInstanceOf: (constructable) => {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'object' || !(newValue instanceof constructable))
                    throw new Error(`The property ${target.constructor.name}.${key} must be an instance of ` +
                        `${constructable.prototype.name}.`);
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
     * Verify if the value is an object string-dataMap.
     * @param dataMap The dataMap constructor.
     */
    KeyDataMapPair: (dataMap) => {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'object' ||
                    !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' && _value instanceof dataMap))
                    throw new Error(`The property ${target.constructor.name}.${key} must be an object ` +
                        `string-dataMap.`);
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
     * Verify if the value is an object string-superModelColumn.
     * @param superModelColumn The superModelColumn constructor.
     */
    KeySuperModelColumnPair: (superModelColumn) => {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'object' ||
                    !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' && _value instanceof superModelColumn))
                    throw new Error(`The property ${target.constructor.name}.${key} must be an object ` +
                        `string-superModelColumn.`);
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
     * Verify if the value is a class instance of a placeholder value.
     * @param arg The class constructor.
     * @param placeholder The placeholder constructor.
     */
    KindOfInstance: (arg, placeholder) => {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'object' ||
                    !Object.entries(newValue).every(([_key, _value]) => typeof _key === 'string' &&
                        (_value instanceof arg || _value instanceof placeholder)))
                    throw new Error(`The property ${target.constructor.name}.${key} must be an ` +
                        `instance of ${arg.prototype.name} or a default placeholder.`);
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
};
