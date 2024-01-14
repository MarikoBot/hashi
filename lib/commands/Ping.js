"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const root_1 = require("../root");
exports.Ping = new root_1.HashiSlashCommand('ping')
    .setDescription('Replies with pong.')
    .setCallbackFunction(async (client, interaction, context) => {
    await interaction.reply({ content: 'Pong!', ephemeral: true }).catch(client.logger.clean);
    return context.command.end();
});
