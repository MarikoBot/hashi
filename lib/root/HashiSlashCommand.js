"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiSlashCommand = void 0;
const decorators_1 = require("../decorators");
const _1 = require("./");
/**
 * The class who represents a base-command for the Hashi package.
 */
class HashiSlashCommand extends _1.HashiCommandBase {
    /**
     * The Discord slash command data. PROVIDE THE SUBCOMMANDS(GROUPS) DATA.
     */
    src;
    /**
     * The subcommand groups of the command.
     */
    subcommandGroups = [];
    /**
     * The subcommands of the command.
     */
    subcommands = [];
    /**
     * The constructor for the HashiSlashCommand.
     */
    constructor() {
        super('slash');
    }
}
exports.HashiSlashCommand = HashiSlashCommand;
__decorate([
    decorators_1.Validators.ObjectValidator.Matches,
    __metadata("design:type", Object)
], HashiSlashCommand.prototype, "src", void 0);
__decorate([
    (decorators_1.Validators.ArrayValidator.OnlyConstructorOf(_1.HashiSlashSubcommandGroup)),
    __metadata("design:type", Array)
], HashiSlashCommand.prototype, "subcommandGroups", void 0);
__decorate([
    (decorators_1.Validators.ArrayValidator.OnlyConstructorOf(_1.HashiSlashSubcommand)),
    __metadata("design:type", Array)
], HashiSlashCommand.prototype, "subcommands", void 0);
