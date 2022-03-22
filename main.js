const { Client, Intents }  = require("discord.js");
const Discord = require('discord.js');
require("dotenv").config();
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name,command)
}

const loginInfo = process.env.CLIENT_TOKEN;
const prefix = process.env.PREFIX;

client.on("ready", () => {
  console.log(prefix);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase()

  if(command === 'ping'){
    client.commands.get('ping').execute(message,args);
  }
})

client.login(loginInfo);
