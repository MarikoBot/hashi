"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreate = void 0;
const decorators_1 = require("../decorators");
const root_1 = require("../root");
/**
 * An example of use case for the HashiEvent class.
 */
let MessageCreate = class MessageCreate extends root_1.HashiEvent {
    /**
     * The function that is called when an interaction is triggered.
     * @param client The client instance.
     * @param message The associated message.
     * @returns Nothing.
     */
    callback = async (client, message) => {
        if (message.author.id === '1146145475683164273')
            client.logger.info(message.content);
    };
};
exports.MessageCreate = MessageCreate;
exports.MessageCreate = MessageCreate = __decorate([
    decorators_1.Injectors.HashiEventInjector('messageCreate')
], MessageCreate);
