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
exports.HashiMessageCommand = void 0;
const _1 = require("./");
const decorators_1 = require("../decorators");
/**
 * The class that represents a command into a message.
 */
let HashiMessageCommand = class HashiMessageCommand extends _1.HashiCommandBase {
    /**
     * The constructor for a new message command.
     */
    constructor() {
        super('message');
    }
};
exports.HashiMessageCommand = HashiMessageCommand;
exports.HashiMessageCommand = HashiMessageCommand = __decorate([
    decorators_1.Injectors.HashiCommandInjector({
        type: 'message',
    }),
    __metadata("design:paramtypes", [])
], HashiMessageCommand);
