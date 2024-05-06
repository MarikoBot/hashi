"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });
const src_1 = require("../src");
const client = new src_1.Client({ ...(require('./hashi.config.json')), failIfNotExists: false });
void client.connectDatabase();
let Ready = class Ready extends src_1.DiscordEvent {
    callback(client) {
        void client.logger.sendTo('status', { content: '<:MarikoOnline:1186296992629014558> The bot is now **online**.' });
    }
};
Ready = __decorate([
    client.events.inject('ready')
], Ready);
let User = class User extends src_1.SuperModel {
    onLoaded() {
        return {
            arcId: new src_1.SuperModelColumn(String),
            name: new src_1.SuperModelColumn(String),
            coverUrl: new src_1.SuperModelColumn(String),
            chapters: new src_1.SuperModelColumn([String]),
            visibility: new src_1.SuperModelColumn(String),
        };
    }
};
User = __decorate([
    client.db.inject('user')
], User);
void client.login();
