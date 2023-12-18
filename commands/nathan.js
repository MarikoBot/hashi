const {HashiSlashCommand, HashiSlashSubcommand} = require("../lib/index.js");

const nathan = async (client, interaction, ctx) => {
    await interaction.reply('nathan...');
    return ctx.command.end();
};

const isgay = async (client, interaction, ctx) => {
    setTimeout(async () => await interaction.editReply('...is gay.'), 5000);
    return ctx.command.end();
};

module.exports = new HashiSlashCommand('nathan')
    .setDescription('Son gros front dégarni')
    .setCoolDown(4)
    .addHashiSlashSubcommand(
        new HashiSlashSubcommand('isgay')
            .setDescription('Il est gay')
            .setCallbackFunction(isgay)
    )
    .setCallbackFunction(nathan);