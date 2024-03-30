import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import { HashiClient } from '../src';

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