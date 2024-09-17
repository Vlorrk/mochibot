const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');
const clientReadyPath = path.join(__dirname, '..', '..', 'events', 'clientReady.js');
const { scheduledMessage } = require(clientReadyPath);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_time')
		.setDescription('Set the time you would like your hydrate reminder.')
		.addStringOption(option =>
			option.setName('interval')
				.setDescription('Give the time you want your hydrate message at.')
				.setRequired(true)
				.addChoices(
					{ name: 'Every 1 hour', value: '1h' },
					{ name: 'Every 2 hours', value: '2h' },
					{ name: 'Every 3 hours', value: '3h' },
					{ name: 'Every 4 hours', value: '4h' },
					{ name: 'Every 6 hours', value: '6h' }
				)
		),

	async execute(interaction) {
		const intervalChoice = interaction.options.getString('interval');
		let cronExpression;

		switch (intervalChoice) {
			case '1h':
				cronExpression = '0 */1 * * *'; // every 1 hour at minute 0
				break;
			case '2h':
				cronExpression = '0 */2 * * *'; // every 2 hours at minute 0
				break;
			case '3h':
				cronExpression = '0 */3 * * *';
				break;
			case '4h':
				cronExpression = '0 */4 * * *';
				break;
			case '6h':
				cronExpression = '0 */6 * * *';
				break;
			default:
				cronExpression = '0 */1 * * *'; // default to 1 hour if no match
		}

		scheduledMessage.time = cronExpression;
		await interaction.reply(`Your hydrate reminder is now set for every ${intervalChoice.replace('h', ' hour(s)')}.`);
	}
}
