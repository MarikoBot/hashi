"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ArrayDeepValidator.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:28 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:46:21 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayDeepValidator = void 0;
const shared_1 = require("../shared");
/**
 * All the array type
 */
exports.ArrayDeepValidator = {
    /**
     * Verify if an array is composed only of a constructable class object.
     * @param constructable The class the value shall inherit.
     */
    OnlyConstructorOf: (constructable) => {
        return function (target, key) {
            let value;
            const setter = (newValue) => {
                if (typeof newValue !== 'object' ||
                    !(0, shared_1.isConstructor)(newValue) ||
                    ((0, shared_1.isConstructor)(newValue) &&
                        'prototype' in newValue &&
                        'name' in newValue.prototype &&
                        newValue.prototype.name !==
                            constructable.prototype.name))
                    throw new Error(`The property ${target.constructor.name}.${key} must be a constructor of ` +
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
};
