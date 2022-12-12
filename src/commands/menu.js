/*
 * Select menu for a variety of included games 
 */

const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('Opens the Game Menu'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('Select')
					.setPlaceholder('Select a Game')
					.addOptions(
						{
							label: 'Rock Paper Scissors',
							value: 'rps',
						},
						{
							label: 'Dice Roll',
							value: 'diceroll',
						},
						{
							label: 'Coin Toss',
							value: 'cointoss',
						},
					),
			);

		await interaction.reply({ content: 'Game time!', ephemeral: 'true', components: [row] });
	},
};