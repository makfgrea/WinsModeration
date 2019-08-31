const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.id === "348745835187666944") return message.reply("Sorry, you can't do that.");
    let rMember = message.guild.member(message.mentions.users.first()) || message.quild.members.get(args[0]);
    if (!rMember) return message.reply("Couldn't find that user.");
    let role = args.join(" ").slice(22);
    if (!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return message.reply("Couldn't find that role.");

    if (rMember.roles.has(gRole.id)) return message.reply("The already have that role.");
    await (rMember.addRole(gRole.id));

    try {
        await rMember.send(`You have been given the role: ${gRole.name}`)
    } catch (e) {
        message.channel.send(`<@${rMember.id}>, they have been given the role: ${gRole.name}. We tried to DM them, but their DMs are locked.`)
    }
}

module.exports.help = {
    name: "addrole"
}
