"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk = require("chalk");
/**
 * The Logger class. Contains multiple functions to log data.
 */
class Logger {
    /**
     * The name of the project.
     */
    #projectName;
    /**
     * Get the name of the project.
     * @returns The name of the project.
     */
    get projectName() {
        return this.#projectName;
    }
    /**
     * The constructor of the Logger class.
     * @param name The name of the project.
     */
    constructor(name) {
        this.#projectName = name;
    }
    /**
     * Logs something in the console using the info assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    info(...args) {
        args.forEach((arg) => {
            console.log(chalk.blue(`「 ${this.projectName} INFO 」`), chalk.blue(arg.message || arg));
            if (arg.message)
                console.log(arg);
        });
    }
    /**
     * Logs something in the console using the clean assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    clean(...args) {
        args.forEach((arg) => {
            console.log(chalk.grey(`「 ${this.projectName} INFO 」`), chalk.grey(arg.message || arg));
            if (arg.message)
                console.log(arg);
        });
    }
}
exports.Logger = Logger;
