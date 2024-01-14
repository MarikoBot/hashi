const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../.env` });

const { HashiClient, Data } = require('./lib');

const client = new HashiClient({
  intents: 3276799,
  processName: 'BOT-LAB',
  mongoose: {
    dbName: 'dev',
    connectionURI: 'mongodb://localhost:27017/',
    connectOptions: { dbName: 'dev' },
  },
});

client.serviceManager.enable('AutomaticRole');

void client.login();

Data.Models.AutomaticRoleModel.create({
  discordId: String(Date.now()),
  roles: ["1", "2"],
});

setInterval(async () => {
  console.log(await client.databaseManager.dataMaps.automaticRole.content());
}, 2000);
