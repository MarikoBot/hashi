"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk = require("chalk");
const decorators_1 = require("../decorators");
/**
 * The Logger class. Contains multiple functions to log data.
 */
class Logger {
    /**
     * The name of the project.
     */
    projectName;
    /**
     * The constructor of the Logger class.
     * @param name The name of the project.
     */
    constructor(name) {
        this.projectName = name;
    }
    /**
     * Logs something in the console using the info assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    info(...args) {
        args.forEach((arg) => {
            console.log(chalk.blue(`「 ${this.projectName.toUpperCase()} INFO 」`), chalk.blue(arg.message || arg));
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
            console.log(chalk.grey(`「 ${this.projectName.toUpperCase()} INFO 」`), chalk.grey(arg.message || arg));
            if (arg.message)
                console.log(arg);
        });
    }
}
exports.Logger = Logger;
__decorate([
    decorators_1.Validators.StringValidator.NotEmpty
], Logger.prototype, "projectName", void 0);
