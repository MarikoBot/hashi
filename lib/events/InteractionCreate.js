"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionCreate = void 0;
const root_1 = require("../root");
exports.InteractionCreate = new root_1.HashiEvent('interactionCreate').setCallbackFunction(async (client, interaction) => {
    if (interaction.isChatInputCommand())
        await client.detectAndLaunchSlashCommand(interaction);
});
