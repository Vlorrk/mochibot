//get the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
const { token, botChannel } = require("./config.json");

//new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

//login with bot token
const login = async () => {
  try {
    await client.login(token);
    console.log("logged in!");
  } catch {
    console.log("couldnt login :9");
  }
};

login();

// client.on("ready", (client) => {
//   client.channels.cache.get(botChannel).send("@everyone drink water!");
// });

let currentTime = new Date();

setInterval(console.log(currentTime.getSeconds()), 1000);
