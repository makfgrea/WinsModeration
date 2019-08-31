const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let { body } = await superagent
        .get(`https://randomfox.ca/floof/`);

    let dogembed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle("Fox :fox:")
        .setImage(body.image);

    message.channel.send(dogembed);
}

module.exports.help = {
    name: "fox"
}