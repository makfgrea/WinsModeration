const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if (!message.member.id === "348745835187666944") return message.reply("Sorry, you can't do that.");
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#ff005d")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "bot-spam");
    if (!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
    name: "ban"
}
