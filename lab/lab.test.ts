// tslint:disable:max-classes-per-file
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

import { Client, SuperModel, SuperModelColumn, DiscordEvent } from '../src';
import { Logger } from '../types';

const client: Client = new Client({ ...(require('./hashi.config.json')), failIfNotExists: false });
void client.connectDatabase();

client.events.inject(
  'ready',
  function callback(client: Client): void {
    void Logger.sendTo(client, 'status', { content: '<:MarikoOnline:1186296992629014558> The bot is now **online**.' });
  },
);

const user: SuperModel = client.db.inject('user', {
  arcId: new SuperModelColumn({ type: String, required: true }),
  name: new SuperModelColumn(String),
  coverUrl: new SuperModelColumn(String),
  chapters: new SuperModelColumn([String]),
  visibility: new SuperModelColumn(String),
});

void user.model.create({
  arcId: 3,
});

void client.login();