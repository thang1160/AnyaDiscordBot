const commando = require('discord.js-commando');

class Maintenance extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'nou',
            group: 'random',
            memberName: 'nou',
            description: 'no u'
        });
    }

    async run(message, input) {
        var textArray = [
            'https://media.discordapp.net/attachments/176380280293163008/558171167861506074/Nou.gif',
            'https://tenor.com/view/two-spiderman-pointing-meme-gif-11796793',
            'https://tenor.com/view/nou-gif-7959059'
        ];
        var randomNumber = Math.floor(Math.random()*textArray.length);
        message.channel.send(textArray[randomNumber]);
    }
}

module.exports = Maintenance;
