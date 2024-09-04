const { Events } = require('discord.js');
const { CronJob } = require('cron');

const scheduledMessage = {
  message: 'Drink Water!',
  time: '*/30 * * * * *',
  channel: null,
}

let previousTime = scheduledMessage.time;

module.exports = {
  name: Events.ClientReady,
  async execute() {
    console.log('bot is ready!');

    const job = new CronJob(scheduledMessage.time, function() {
      const channel = scheduledMessage.channel;

      if (channel) {
        channel.send(scheduledMessage.message);
        console.log(scheduledMessage.time);
      } else {
        console.error('No channel has been set.');
      }
    },)

    job.start();

    const checkTimeUpdate = new CronJob('*/5 * * * * *', () => {

      if (scheduledMessage.time !== previousTime) {
        task.stop();
        task.start();
        previousTime = scheduledMessage.time;
      }
    })

    checkTimeUpdate.start();
  },
  scheduledMessage,
}
