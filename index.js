const { Client, Collection } = require("discord.js");
require('dotenv').config({path:'./.env'});

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.token = process.env.TOKEN;
client.prefix = process.env.PREFIX;

// Initializing the project
require("./handler")(client);

client.login(process.env.TOKEN);
