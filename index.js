// Discord.js bot
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require("fs")

client.on('ready', () => {
    client.user.setActivity('Your Fashionframes', {type: 'WATCHING'});
});

//One giant joke
client.on('message', message => {
  if (message.content.toLowerCase().startsWith("i am")) {
    var message1 = "Hello";
    var message2 = ", my name is Scrubstep.";
    var name = message.content.replace(/i am/gi, "");
    message.channel.send(message1 + name + message2);
  }
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  if (message.content.toLowerCase().startsWith(config.prefix + "ping")) {
    message.channel.send({embed: {
    "color": 3447003,
    "timestamp": new Date(),
    "footer": {
      "icon_url": client.user.avatarURL,
      "text": client.user.username
    },
    "fields": [
      {
        "name": "Ping Calculator",
        "value": new Date().getTime() - message.createdTimestamp + " ms"
      }
    ]
  }
});

client.login(process.env.TOKEN);