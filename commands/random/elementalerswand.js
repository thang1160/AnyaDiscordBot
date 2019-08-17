const commando = require('discord.js-commando');

class ElementalersWand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'elementalerswand',
            group: 'random',
            memberName: 'elementalerswand',
            description: 'How elementaler\'s wand work'
        });
    }

    async run(message, input) {
        message.channel.send("", {
            files: [{ attachment: "https://i.imgur.com/bfuN7DD.png" }]
        });
    }
}

module.exports = ElementalersWand;