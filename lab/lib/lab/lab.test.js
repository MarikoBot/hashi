"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });
const src_1 = require("../src");
const client = new src_1.Client({ ...(require('./hashi.config.json')), failIfNotExists: false });
void client.connectDatabase();
client.events.inject('ready', function callback(client) {
    void client.logger.sendTo('status', { content: '<:MarikoOnline:1186296992629014558> The bot is now **online**.' });
});
const user = client.db.inject('user', {
    arcId: new src_1.SuperModelColumn({ type: String, required: true }),
    name: new src_1.SuperModelColumn(String),
    coverUrl: new src_1.SuperModelColumn(String),
    chapters: new src_1.SuperModelColumn([String]),
    visibility: new src_1.SuperModelColumn(String),
});
void user.model.create({
    arcId: 3,
});
void client.login();
