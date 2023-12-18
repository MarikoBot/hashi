const { HashiClient } = require('./lib/index.js');
const {DB_TECHNOLOGY, DATAMAP_INTENTS} = require("./lib/DataMap");

const client = new HashiClient({
    processName: "HASHI-TEST",
    commandsDir: "commands",
    eventsDir: "events"
});

const firstEnmap = client.DatabaseManager.createDataMap('main', DB_TECHNOLOGY.SQLITE);
firstEnmap.addIntent(DATAMAP_INTENTS.CORE);

client.ServiceManager.enable('AutomaticRole');

void client.login();
