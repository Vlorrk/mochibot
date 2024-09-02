const { SlashCommandBuilder } = require('discord.js');
const { scheduledMessage } = require('E:/programming/GitHub/mochibot/events/clientReady.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_time')
		.setDescription('Set the time you would like your hydrate reminder.')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('Give the time you want your hydrate message at.')
				.setRequired(true)),

	async execute(interaction) {
		let userTime = interaction.options.getString('time');
		console.log(userTime);
		scheduledMessage.time = `*/${userTime} * * * * *`;
		await interaction.reply(`Your hydrate reminder is now set at <t:${scheduledMessage.time}:t>`);
	}
}
