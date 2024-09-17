const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');
const clientReadyPath = path.join(__dirname, '..', '..', 'events', 'clientReady.js');
const { scheduledMessage } = require(clientReadyPath);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test_message')
		.setDescription('Send a test of the notification message.'),
	async execute(interaction) {
		await interaction.reply(`${scheduledMessage.message}`);
	},
}
