"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ready = void 0;
const root_1 = require("../root");
exports.Ready = new root_1.HashiEvent('ready').setCallbackFunction((client) => {
    console.log('I am ready!');
});
