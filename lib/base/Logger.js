"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk = require("chalk");
const index_1 = require("./index");
const root_1 = require("../root");
const discord_js_1 = require("discord.js");
/**
 * The Logger class. Contains multiple functions to log data.
 */
class Logger extends index_1.BaseClient {
    /**
     * Split a str to make it fit into a given size.
     * @param str The str to crop.
     * @param max The max length limit.
     * @returns The cropped (or not) string.
     */
    static crop(str, max) {
        if (max === 'flex')
            return str;
        return str.length > max ? str.slice(0, max - 3) + '...' : str + '.'.repeat(max - str.length);
    }
    /**
     * Returns the prefix for the logging.
     * @param mode The 'label' that describes the assets pack.
     * @param str The string to split to fit a given size.
     * @returns The prefix (str).
     */
    static prefix(mode, str = process.env.PROJECT_NAME.toLowerCase()) {
        return `(${Logger.crop(mode, 'flex')}) ${Logger.crop(str, 'flex')}`;
    }
    /**
     * Logs something in the console using the error assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static error(...args) {
        this.log('error', args);
    }
    /**
     * Logs something in the console using the success assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static success(...args) {
        this.log('success', args);
    }
    /**
     * Logs something in the console using the warning assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static warning(...args) {
        this.log('warning', args);
    }
    /**
     * Logs something in the console using the info assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static info(...args) {
        this.log('info', args);
    }
    /**
     * Logs something in the console using the debug assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static debug(...args) {
        this.log('debug', args);
    }
    /**
     * Logs something in the console using the test assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static test(...args) {
        this.log('test', args);
    }
    /**
     * Logs something in the console using the clean assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static clean(...args) {
        this.log('clean', args);
    }
    /**
     * Logs something in the Discord "status" channel.
     * @param client The associated client.
     * @param channelIdentifier The channel identifier into the config object.
     * @param messages The messages data to send.
     * @returns Nothing.
     */
    static async sendTo(client, channelIdentifier, ...messages) {
        const channel = await client.src.channels.fetch(client.config.channels[channelIdentifier]);
        if (channel instanceof discord_js_1.TextChannel) {
            for (const msg of messages)
                await channel.send(msg).catch(this.clean);
        }
    }
    /**
     * Logs something in the console using the chosen assets.
     * @param mode The mode (assets pack).
     * @param args The data to print.
     * @returns Nothing.
     */
    static log(mode, ...args) {
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
        const background = 'DEFAULT';
        const assets = background === 'DEFAULT' ? chalk[color] : chalk[background][color];
        console.log(assets(`${this.prefix(mode, process.env.PROJECT_NAME.toLowerCase())} →`), assets(args.map((arg) => arg.map((argShard) => argShard).join('')).join('')));
    }
}
exports.Logger = Logger;
