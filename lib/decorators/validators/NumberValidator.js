"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   NumberValidator.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:37 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:32:16 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValidator = void 0;
/**
 * All the number type
 */
exports.NumberValidator = {
    /**
     * Verify if the value is a number.
     * @param target The class instance.
     * @param key The attribute to set.
     */
    Matches: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'number')
                throw new Error(`The property ${target.constructor.name}.${key} must be a number.`);
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
