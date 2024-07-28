"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   shared.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:14 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 00:30:22 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATAMAP_INTENTS = void 0;
/**
 * The list of flags for the data map intents.
 */
var DATAMAP_INTENTS;
(function (DATAMAP_INTENTS) {
    /**
     * If the data map is used for store the most important data (as process data).
     */
    DATAMAP_INTENTS[DATAMAP_INTENTS["CORE"] = 0] = "CORE";
})(DATAMAP_INTENTS || (exports.DATAMAP_INTENTS = DATAMAP_INTENTS = {}));
