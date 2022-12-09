const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const rockButton = new ButtonBuilder()
    .setCustomId('rock')
    .setLabel('Rock')
    .setStyle(ButtonStyle.Secondary);

const paperButton = new ButtonBuilder()
    .setCustomId('paper')
    .setLabel('Paper')
    .setStyle(ButtonStyle.Secondary);

const scissorsButton = new ButtonBuilder()
    .setCustomId('scissors')
    .setLabel('Scissors')
    .setStyle(ButtonStyle.Secondary);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Starts a RockPaperScissors Game'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
                rockButton,
                paperButton,
                scissorsButton
			);

		await interaction.reply({ content: 'Rock! Paper! Scissors!', ephemeral: 'true', components: [row] });
	},
    
};