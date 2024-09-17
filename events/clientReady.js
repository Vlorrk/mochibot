const { Events } = require('discord.js');
const { CronJob, CronTime } = require('cron');

const scheduledMessage = {
  message: 'Drink Water!',
  time: '0 */1 * * * *',
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
      } else {
        console.error('No channel has been set.');
      }
    },)

    job.start();

    const checkTimeUpdate = new CronJob('*/5 * * * * *', () => {

      if (scheduledMessage.time !== previousTime) {
        job.stop();
        try {
          job.setTime(new CronTime(scheduledMessage.time));
        } catch {
          console.log('the setTime command did not work. please try again');
        }
        job.start();
        previousTime = scheduledMessage.time;
      }
    })

    checkTimeUpdate.start();
  },
  scheduledMessage,
}
