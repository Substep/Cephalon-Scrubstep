// Discord.js bot
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
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

  if (message.content.startsWith(config.prefix + "ping")) {
    message.channel.send("pong");
  } else
  if (message.content.startsWith(config.prefix + "foo")) {
    message.channel.send("bar!");
  }
});

client.on("message", (message) => {
  if(message.content.startsWith(config.prefix + "prefix")) {
    const modRole = message.guild.roles.find("name", "Owner");
  if (!modRole) 
    return console.log("The Owner role does not exist.");

  if (!message.member.roles.has(modRole.id))
    return message.send("You can't use this command.");

      let newPrefix = message.content.split(" ").slice(1, 2)[0];
      config.prefix = newPrefix;
      var beg = "Sucessfully changed the prefix to";
      var prefix = config.prefix;
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    return message.send(beg.concat(prefix))
}
});

client.login(process.env.TOKEN);