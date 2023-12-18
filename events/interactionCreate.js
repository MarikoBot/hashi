const {HashiEvent} = require("../lib/index");

module.exports = new HashiEvent('interactionCreate')
    .setCallbackFunction((client, interaction) => client.detectAndLaunchCommand(interaction));