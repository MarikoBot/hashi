import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import {HashiClient, SuperModel, SuperModelColumn, HashiEvent} from '../src';
import { HashiSlashCommand } from '../types';

const client: HashiClient = new HashiClient({
  intents: 3276799,
  projectName: 'MarikoBot-Hashi',
  configChannels: {
    status: '1228631187459670046'
  },
  mongoose: {
    dbName: 'dev',
    connectionURI: 'mongodb://localhost:27017/',
    connectOptions: { dbName: 'hashi-dev' },
  },
});
void client.connectDatabase();

@client.events.inject('ready')
class Ready extends HashiEvent {
  callback(client: HashiClient): void {
    void client.logger.sendTo('status', { content: '<:MarikoOnline:1186296992629014558> The bot is now **online**.' });
  }
}

@client.commands.inject({
  type: 'slash',
  id: 'ping',
  interferingCommands: [],
  coolDown: 3,
})
class Ping extends HashiSlashCommand {

}

@client.db.inject('user')
class User extends SuperModel {
  onLoaded() {
    return {
      discordId: new SuperModelColumn(String)
    }
  }
}


void client.db.dataMaps.user.definition.model.create({
  discordId: '1146145475683164273'
});

void client.login();