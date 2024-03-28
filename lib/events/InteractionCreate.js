"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionCreate = void 0;
const root_1 = require("../root");
/**
 * An example of use case for the HashiEvent class. Get the command and launches it using all the managers (cool downs,
 * interfering, database).
 */
class InteractionCreate extends root_1.HashiEvent {
    /**
     * The function that is called when an interaction is triggered.
     * @param client The client instance.
     * @param interaction The associated interaction.
     * @returns Nothing.
     */
    callback = async (client, interaction) => {
        if (interaction.isChatInputCommand())
            await client.detectAndLaunchSlashCommand(interaction);
    };
    /**
     * Define the name of the event into the super constructor.
     */
    constructor(name = 'interactionCreate') {
        super(name);
    }
}
exports.InteractionCreate = InteractionCreate;
