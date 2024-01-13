"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const discord_js_1 = require("discord.js");
const root_1 = require("../root/");
const root_2 = require("../root/");
const root_3 = require("../root/");
const Base_1 = require("./Base");
const fs = require("fs");
const path = require("path");
/**
 * Represents the command manager of the client.
 */
class CommandManager extends Base_1.Base {
    /**
     * The cool downs' manager instance, to get access to the different delays of the current command.
     */
    #coolDowns = new root_2.CoolDownManager();
    /**
     * The interfering manager instance, to have access to the different executing commands.
     */
    #interfering = new root_3.InterferingManager();
    /**
     * The list of commands.
     */
    #commandsList = new discord_js_1.Collection();
    /**
     * Get the cool downs' manager.
     * @returns The cool downs' manager.
     */
    get coolDowns() {
        return this.#coolDowns;
    }
    /**
     * Get the interfering manager.
     * @returns The interfering manager.
     */
    get interfering() {
        return this.#interfering;
    }
    /**
     * Get the list of commands.
     * @returns The list of commands.
     */
    get commandsList() {
        return this.#commandsList;
    }
    /**
     * The constructor of the command manager.
     * @param client The client instance.
     */
    constructor(client) {
        super(client);
    }
    /**
     * Add a command to the client (the bot) using the name, options and or the command itself.
     * If no command is passed, the function creates one based on the data passed.
     * @param commandData The options passed (name, command options, command instance).
     * @returns The command manager instance (this).
     */
    addCommand(commandData) {
        this.commandsList.set(commandData.name, commandData);
        return this;
    }
    /**
     * Get a command from the cache with the name.
     * @param interaction The interaction.
     * @returns The found command instance, or undefined.
     */
    getCommand(interaction) {
        let command = this.commandsList.get(interaction.commandName);
        const commandSubcommandGroupOption = command.hashiSubcommandsGroups.length
            ? interaction.options.getSubcommandGroup()
            : null;
        const commandSubcommandOption = command.hashiSubcommands.length
            ? interaction.options.getSubcommand()
            : null;
        let subcommandGroup;
        let subcommand;
        if (commandSubcommandGroupOption) {
            subcommandGroup = command.hashiSubcommandsGroups
                .filter((group) => group.name === commandSubcommandGroupOption)
                ?.at(0);
            subcommand = subcommandGroup.hashiSubcommands
                .filter((cmd) => cmd.name === interaction.options.getSubcommand())
                ?.at(0);
            subcommandGroup.setClient(this.client);
            subcommand.setClient(this.client);
        }
        else if (commandSubcommandOption) {
            subcommand = command.hashiSubcommands
                .filter((cmd) => cmd.name === commandSubcommandOption)
                ?.at(0);
            subcommand.setClient(this.client);
        }
        command.setClient(this.client);
        return { command, subcommand, subcommandGroup };
    }
    /**
     * Load the commands from the given commands directory.
     * @returns Nothing.
     */
    async loadCommands() {
        const files = fs.readdirSync(`lib/${this.client.commandsDir}`);
        const commands = [];
        let i = -1;
        let commandData;
        while (++i < files.length) {
            commandData = require(path.join(__dirname, `../../../../lib/${this.client.commandsDir}/${files[i]}`));
            commandData.setClient(this.client);
            this.client.commandManager.commandsList.set(files[i].replace('.js', ''), commandData);
            const discordDataOnly = Object.assign(new root_1.HashiSlashCommand('default'), commandData);
            discordDataOnly.clearClient();
            discordDataOnly.clearContext();
            commands.push(discordDataOnly);
        }
        void (await this.client.src.application.commands.set(commands));
    }
}
exports.CommandManager = CommandManager;
