const { SlashCommandBuilder } = require('discord.js');
const { scheduledMessage } = require('E:/programming/GitHub/mochibot/events/clientReady.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_channel')
		.setDescription('Sets the channel you want your hydrate message in.')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Give the channel you want your hydrate message in.')
				.setRequired(true)),

	async execute(interaction) {
		scheduledMessage.channel = interaction.options.getChannel('channel');
		await interaction.reply(`Got it! Your reminders will be in the channel ${scheduledMessage.channel}`);
	},
}
