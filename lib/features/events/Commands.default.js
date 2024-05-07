"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The default feature for the command handler.
 */
const data = (_Client) => ({
    /**
     * The class instance.
     */
    default: (client, interaction) => {
        if (interaction.isChatInputCommand())
            return void client.commands.detectAndLaunchSlashCommand(interaction);
        return void null;
    },
    /**
     * The metadata to inject.
     */
    eventName: 'interactionCreate',
});
exports.default = data;
