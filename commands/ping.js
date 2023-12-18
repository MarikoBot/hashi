const {HashiSlashCommand, HashiSlashSubcommandGroup, HashiSlashSubcommand} = require("../lib/index.js");

const ping = async (client, interaction, ctx) => {
    await interaction.reply('ping...');
    return ctx.command.end();
};

const pang = async (client, interaction, ctx) => {
    setTimeout(async () => {
        await interaction.editReply('pang.');
        return ctx.command.end();
    }, 5000);
};

const pong = async (client, interaction, ctx) => {
    setTimeout(async () => {
        await interaction.editReply('pong!');
        return ctx.command.end();
    }, 5000);
};

module.exports = new HashiSlashCommand('ping')
    .setDescription('Ping pong on your big crane')
    .setCoolDown(4)
    .addHashiSlashSubcommandGroup(
        new HashiSlashSubcommandGroup('pang')
            .setDescription('The pang gang')
            .setCallbackFunction(pang)
            .addHashiSlashSubcommand(
                new HashiSlashSubcommand('pong')
                    .setDescription('The pong gang')
                    .setCallbackFunction(pong)
            )
    )
    .setCallbackFunction(ping);