//get the necessary discord.js classes
const { Client, Collection, Events, Routes, GatewayIntentBits } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');

//new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent],
});


client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands'); //use node:path to get the 'commands' dir
const commandsFolders = fs.readdirSync(foldersPath);  //use node:fs (file system) to .readdir (read dir) Sync (synchronous/1 at a time)

for (const folder of commandsFolders) { // go through array of dirs in 'commandsFolders'

  const commandsPath = path.join(foldersPath, folder);  //node:path to get path to current 'folder' i.e. commands/utility
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //read current 'folder' for .js files

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file); //create path to current .js file
    const command = require(filePath); //create a command variable with the correct 'filePath'

    if ('data' in command && 'execute' in command) {  //check for valid command
      client.commands.set(command.data.name, command);
    }
    else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" prop.`);
    }
  }

}

// retrieve event files
const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const eventFile of eventsFiles) {
  const filePath = path.join(eventsPath, eventFile);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

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
