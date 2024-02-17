"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreate = void 0;
const root_1 = require("../root");
const event = new root_1.HashiEvent('messageCreate');
event.callback = async (client, message) => {
    if (message.author.id === '1146145475683164273')
        client.logger.info(message.content);
};
exports.MessageCreate = event;
