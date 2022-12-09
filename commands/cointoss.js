const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const cointoss = new ButtonBuilder()
    .setCustomId('cointoss')
    .setLabel('Coin Toss')
    .setStyle(ButtonStyle.Secondary);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cointoss')
		.setDescription('Toss a coin!'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            cointoss
        );
        await interaction.reply({ content: 'Toss the coin!', ephemeral: 'true', components: [row] });
	},
};
