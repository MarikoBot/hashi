"use strict";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   new Logger().ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ehosta <ehosta@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/07/27 20:06:10 by ehosta            #+#    #+#             */
/*   Updated: 2024/07/28 00:25:24 by ehosta           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk = require("chalk");
const root_1 = require("../root");
/**
 * The Logger class. Contains multiple functions to log data.
 */
class Logger {
    /**
     * Split a str to make it fit into a given size.
     * @param str The str to crop.
     * @param max The max length limit.
     * @returns The cropped (or not) string.
     */
    crop(str, max) {
        if (max === 'flex')
            return str;
        return str.length > max
            ? str.slice(0, max - 3) + '...'
            : str + '.'.repeat(max - str.length);
    }
    /**
     * Returns the prefix for the logging.
     * @param mode The 'label' that describes the assets pack.
     * @param str The string to split to fit a given size.
     * @returns The prefix (str).
     */
    prefix(mode, str = process.env.PROJECT_NAME.toLowerCase()) {
        return `(${new Logger().crop(mode, 'flex')}) ${new Logger().crop(str, 'flex')}`;
    }
    /**
     * Logs something in the console using the chosen assets.
     * @param mode The mode (assets pack).
     * @param args The data to print.
     * @returns Nothing.
     */
    log(mode, ...args) {
        const color = root_1.loggerModes.includes(mode)
            ? {
                error: 'red',
                success: 'green',
                warning: 'yellow',
                info: 'blue',
                debug: 'magenta',
                test: 'cyan',
                clean: 'gray',
            }[mode]
            : 'white';
        const assets = chalk[color];
        if (process.env.DEV_MODE === 'false')
            console.log(assets(`${this.prefix(mode, process.env.PROJECT_NAME.toLowerCase())} →`), assets(...args));
        if (process.env.DEV_MODE === 'true') {
            console.log(assets(`${this.prefix(mode, process.env.PROJECT_NAME.toLowerCase())} ↵`));
            console.log(...args);
        }
    }
    /**
     * Logs something in the console using the clean assets.
     * @param mode The mode (assets pack).
     * @param args The data to print.
     * @returns Nothing.
     */
    clean(...args) {
        this.log('clean', args);
    }
}
exports.Logger = Logger;
