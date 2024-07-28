"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PublicChatInputCommandInteraction.ts               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:07:45 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 14:43:43 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicChatInputCommandInteraction = void 0;
const discord_js_1 = require("discord.js");
/**
 * The public remaster of the Discord.js interaction.
 */
class PublicChatInputCommandInteraction extends discord_js_1.ChatInputCommandInteraction {
    constructor(...args) {
        super(args[0], args[1]);
    }
}
exports.PublicChatInputCommandInteraction = PublicChatInputCommandInteraction;
