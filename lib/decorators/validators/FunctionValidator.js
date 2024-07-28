"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FunctionValidator.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:32 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:29:29 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionValidator = void 0;
/**
 * All the function type
 */
exports.FunctionValidator = {
    /**
     * Verify if the value is a function.
     * @param target The class instance.
     * @param key The attribute to set.
     */
    Matches: (target, key) => {
        let value;
        const setter = (newValue) => {
            if (typeof newValue !== 'function')
                throw new Error(`The property ${target.constructor.name}.${key} must be a function.`);
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
