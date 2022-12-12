/*
 * Bot Driver and Event Listeners to control user interaction
 */

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Creates a Collection of available commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, '/src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//Bot ready to accept clients/requests
client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

//Bot recieved slash command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Bot recieved select menu selection
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	const selected = interaction.values[0];
	const command = client.commands.get(selected);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Bot recieved a button click
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isButton()) return;

	const clicked = interaction.customId;

	//TODO: move game logic
	if (clicked === 'rock' || clicked === 'paper' || clicked === 'scissors') {
		const ROCK = 0;
		const PAPER = 1;
		const SCISSORS = 2;

		const rand = Math.floor(Math.random() * 3);

		if (clicked === 'rock') {
			if (rand === ROCK) {
				await interaction.update({
					content: 'DRAW',
					fetchReply: true
				});
			} else if (rand === PAPER) {
				await interaction.update({
					content: 'PAPER beats ROCK. You Lose!',
					fetchReply: true
				});
			} else if (rand === SCISSORS) {
				await interaction.update({
					content: 'ROCK beats SCISSORS. You Win!',
					fetchReply: true
				});
			}
		} else if (clicked === 'paper') {
			if (rand === ROCK) {
				await interaction.update({
					content: 'PAPER beats ROCK. You Win!',
					fetchReply: true
				});
			} else if (rand === PAPER) {
				await interaction.update({
					content: 'DRAW',
					fetchReply: true
				});
			} else if (rand === SCISSORS) {
				await interaction.update({
					content: 'SCISSORS beats PAPER. You Lose!',
					fetchReply: true
				});
			}
		} else if (clicked === 'scissors') {
			if (rand === ROCK) {
				await interaction.update({
					content: 'ROCK beats SCISSORS. You Lose!',
					fetchReply: true
				});
			} else if (rand === PAPER) {
				await interaction.update({
					content: 'SCISSORS beats PAPER. You Win!',
					fetchReply: true
				});
			} else if (rand === SCISSORS) {
				await interaction.update({
					content: 'DRAW',
					fetchReply: true
				});
			}
		}
	}

	if (clicked === 'diceroll') {
		const rand = Math.ceil(Math.random() * 6);
		await interaction.update({
			content: 'You rolled ' + rand + '.',
			fetchReply: true
		});
	}

	if (clicked === 'cointoss') {
		const rand = Math.ceil(Math.random() * 2);
		if (rand === 1) {
			await interaction.update({
				content: 'Heads!',
				fetchReply: true
			});	
		} else if (rand === 2) {
			await interaction.update({
				content: 'Tails!',
				fetchReply: true
			});	
		}
	}
});

client.login(token);