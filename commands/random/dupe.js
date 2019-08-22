const commando = require('discord.js-commando');

class Dupe extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'dupe',
            aliases: ['manofculture'],
            group: 'random',
            memberName: 'dupe',
            description: 'man of culture'
        });
    }

    async run(message, input) {
        message.channel.send("I see you're a man of culture as well", {
            files: [{ attachment: "https://i.imgur.com/PSoSppJ.png" }]
        });
    }
}

module.exports = Dupe;