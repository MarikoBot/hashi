// tslint:disable:max-classes-per-file
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

import { Client, SuperModel, SuperModelColumn, DiscordEvent } from '../src';

const client: Client = new Client({ ...(require('./hashi.config.json')), failIfNotExists: false });
void client.connectDatabase();

@client.events.inject('ready')
class Ready extends DiscordEvent {
  callback(client: Client): void {
    void client.logger.sendTo('status', { content: '<:MarikoOnline:1186296992629014558> The bot is now **online**.' });
  }
}

@client.db.inject('user')
class User extends SuperModel {
  onLoaded() {
    return {
      discordId: new SuperModelColumn(String)
    };
  }
}

void client.db.get('user').create({
  discordId: '1146145475683164273'
});

void client.login();