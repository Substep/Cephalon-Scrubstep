// Discord.js bot
const Discord = require("discord.js");
const client = new Discord.Client();
const newUsers = new Discord.Collection();
const config = require("./config.json");
const fs = require("fs")

//Sets the activity of the bot
client.on('ready', () => {
  client.user.setActivity('Fashionframe | ' + config.prefix + 'help', {type: 'PLAYING'});

//Sends message into the channel with the id that bot has started
  client.channels.get('439819029797142538').send({
        embed: {
        "color": 2588365,
        "timestamp": new Date(),
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [
      {
        "name": "Bot Status:",
        "value": "Successfully booted up."
        }]
      }
    });
});  

//Gives/Removes the role with the id when playing/quitting Warframe
client.on('presenceUpdate', (OldMember, NewMember) => {
    if (NewMember.presence.game != null && NewMember.presence.game.name == "Warframe") {
        NewMember.addRole('439947347724730378').catch(console.error);
    }
    else if (OldMember.presence.game !== null && OldMember.presence.game.name == "Warframe"
                && NewMember.presence.game == null || NewMember.presence.game.name !== "Warframe") {
        if (OldMember.roles.has('439947347724730378')) {
            OldMember.removeRole('439947347724730378').catch(console.error);
        }
    }
});

//Sends a oof gif when someone starts a message with "oof"
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("oof")) {
    message.channel.send({
      embed: {
        "color": 2588365,
        "image": {
        "url": "https://media1.tenor.com/images/68b4a3e2a4bded23f88bba28223c81a1/tenor.gif"
    },
        },
    });
  }
});

//I am a noob
client.on('message', (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("i am")) {
    var message1 = "Hello";
    var message2 = ", my name is Scrubstep.";
    var name = message.content.replace(/i am/gi, "");
    message.channel.send(message1 + name + message2);
  }
});

//Im a noob
client.on('message', (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("im")) {
    var message1 = "Hello";
    var message2 = ", my name is Scrubstep.";
    var name = message.content.replace(/im/gi, "");
    message.channel.send(message1 + name + message2);
  }
});

//I'm a noob
client.on('message', (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("i'm")) {
    var message1 = "Hello";
    var message2 = ", my name is Scrubstep.";
    var name = message.content.replace(/i'm/gi, "");
    message.channel.send(message1 + name + message2);
  }
});

//A simple help command
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(config.prefix + "help")) {
    message.channel.send({
      embed: {
    "title": "Commands",
    "color": 2588365,
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

//Tells you your ping to the bot
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(config.prefix + "ping")) {
    message.channel.send({
      embed: {
        "color": 2588365,
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

//Changes the prefix of the bot
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.author.id !== config.ownerID) return message.channel.send({
      embed: {
        "color": 2588365,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "You do not have permission to use this command!"
        }]
      }
    });

  if (message.content.startsWith(config.prefix + "prefix")) {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // change the configuration in memory
  config.prefix = newPrefix;

  // Now we have to save the file.
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    message.channel.send({
      embed: {
        "color": 2588365,
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