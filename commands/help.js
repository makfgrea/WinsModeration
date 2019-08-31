const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let helpEmbed = new Discord.RichEmbed()
        .setDescription("Help using the bot!")
        .setColor("#ff005d")
        .addField("Common Commands:", ">8ball, >botinfo, >cat, >doggo, >fox, >help, >report, >serverinfo.")
        .addField("Admin Commands:", ">addrole, >ban, >kick, >removerole, >tempmute.")

    let helpchannel = message.guild.channels.find(`name`, "bot-spam");
    if (!helpchannel) return message.channel.send("Couldn't find help channel.");

    helpchannel.send(helpEmbed);
}

module.exports.help = {
    name: "help"
} 