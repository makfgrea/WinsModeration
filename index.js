const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.lenght <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity("Supported by Win Family", { type: "PLAYING" });
});

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
    welcomechannel.send(`${member} has joined the server.`);
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} left the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
    welcomechannel.send(`${member} has left the server.`);
});

bot.on("channelCreate", async channel => {
    console.log(`${channel.name} has been created.`);
    let sChannel = channel.guild.channels.find(`name`, "welcome");
    sChannel.send(`${channel} has been created.`);
});

bot.on("channelDelete", async channel => {
    console.log(`${channel.name} has been deleted.`);
    let sChannel = channel.guild.channels.find(`name`, "welcome");
    sChannel.send(`${channel.name} has been deleted.`);
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
});

bot.login(tokenfile.token);