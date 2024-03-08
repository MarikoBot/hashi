import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import { HashiClient, Data } from '../src';

const client: HashiClient = new HashiClient({
  intents: 3276799,
  processName: 'BOT-LAB',
  mongoose: {
    dbName: 'dev',
    connectionURI: 'mongodb://localhost:27017/',
    connectOptions: { dbName: 'hashi-dev' },
  },
});

void client.login();

Data.Models.AutomaticRoleModel.create({
  discordId: String(Date.now()),
  roles: ["1", "2"],
});

setInterval(async (): Promise<void> => {
  console.log(await client.databaseManager.dataMaps.automaticRole.content());
}, 60000);
