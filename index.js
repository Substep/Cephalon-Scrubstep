// Discord.js bot
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")

client.on('ready', () => {
  client.user.setActivity('Fashionframe | ' + config.prefix + 'help', {type: 'PLAYING'});
  
  client.channels.get('439819029797142538').send({
        embed: {
        "color": 3447003,
        "timestamp": new Date(),
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Cephalon Scrubstep",
          "value": "Has successfully booted up!"
        }]
      }
    });
});
  
client.on('presenceUpdate', (OldMember,NewMember) => {
  if (NewMember.presence.game.equals("Warframe")) {
    NewMember.addRole('439790106287669248').catch(console.error);
  
  if (!NewMember.presence.game.equals("Warframe")) {
    NewMember.removeRole('439790106287669248').catch(console.error);
}
  }
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

  if (message.content.toLowerCase().startsWith(config.prefix + "help")) {
    message.channel.send({
      embed: {
    "title": "Commands",
    "color": 3447003,
    "footer": {
      "icon_url": client.user.avatarURL,
      "text": client.user.username
    },
    "fields": [
      {
        "name": config.prefix + "help",
        "value": "Shows this message of all available commands."
      },
      {
        "name": config.prefix + "ping",
        "value": "Tells you your current ping."
      },
      {
        "name": config.prefix + "prefix",
        "value": "Changes the bots prefix to specified prefix."
        }]
      }
    });
  }
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(config.prefix + "ping")) {
    message.channel.send({
      embed: {
        "color": 3447003,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Ping Calculator",
          "value": new Date().getTime() - message.createdTimestamp + " ms"
        }]
      }
    });
  }
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if(message.content.startsWith(config.prefix + "prefix")) {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // change the configuration in memory
  config.prefix = newPrefix;

  // Now we have to save the file.
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    message.channel.send({
      embed: {
        "color": 3447003,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Success!",
          "value": "Prefix has been changed to " + config.prefix
        }]
      }
    });
}
});

client.login(process.env.TOKEN);