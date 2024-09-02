const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
//grab commands from folders
const commandsPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(commandsPath);


for (const folder of commandsFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));


  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`the command at ${filePath} is missing data or execute prop`);
    }
  }
}

//use rest module to 'PUT' commands to guild
const rest = new REST().setToken(token);

const deploy = async () => {
  try {
    console.log(`started refreshing ${commands.length} application (/) commands`);

    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

    console.log(`successfully reloaded ${data.length} application commands`);
  } catch (error) {
    console.error(error)
  }
}

deploy();


// rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1276025487855976448'))
//   .then(() => console.log('deleted a guild command'))
//   .catch(console.error);
//
//
// rest.delete(Routes.applicationCommand(clientId, '1276025487855976448'))
//   .then(() => console.log('deleted a guild command'))
//   .catch(console.error);
