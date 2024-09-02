const { SlashCommandBuilder } = require("discord.js");
const { scheduledMessage } = require('E:/programming/GitHub/mochibot/events/clientReady.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('edit_message')
		.setDescription('Set the message for the hydrate notification.')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('gets new message when giving hydrate notification')
				.setRequired(true)
		),
	async execute(interaction) {
		scheduledMessage.message = interaction.options.getString('message');
		await interaction.reply(`Your message has been changed to ${scheduledMessage.message}`);
	},
}