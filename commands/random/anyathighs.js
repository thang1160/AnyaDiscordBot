const commando = require('discord.js-commando');

class AnyaThighs extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'anyathighs',
            group: 'random',
            memberName: 'anyathighs',
            description: 'True nuke'
        });
    }

    async run(message, input) {
        message.channel.send("", {
            files: [{ attachment: "https://cdn.discordapp.com/attachments/176380280293163008/612583809405157387/Erwin.jpg" }]
        });
    }
}

module.exports = AnyaThighs;