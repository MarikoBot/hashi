"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionCreate = void 0;
const root_1 = require("../root");
const event = new root_1.HashiEvent('interactionCreate');
event.callback = async (client, interaction) => {
    if (interaction.isChatInputCommand())
        await client.detectAndLaunchSlashCommand(interaction);
};
exports.InteractionCreate = event;
