const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const dieButton = new ButtonBuilder()
    .setCustomId('diceroll')
    .setLabel('Roll')
    .setStyle(ButtonStyle.Secondary);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll a die!'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            dieButton
        );
        await interaction.reply({ content: 'Roll!', ephemeral: 'true', components: [row] });
	},
};
