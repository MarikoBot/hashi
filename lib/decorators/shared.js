"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   shared.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:54 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 15:37:49 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConstructor = void 0;
/**
 * The function that returns if a value is a constructor or a constructed.
 * @param value The value to check.
 * @returns If the value is a constructor.
 */
function isConstructor(value) {
    try {
        const proxy = new new Proxy(value, { construct: () => ({}) })();
        return !!proxy;
    }
    catch (err) {
        return false;
    }
}
exports.isConstructor = isConstructor;
