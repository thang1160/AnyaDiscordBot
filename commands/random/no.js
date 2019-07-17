const commando = require('discord.js-commando');

class Maintenance extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'no',
            group: 'random',
            memberName: 'no',
            description: 'just no'
        });
    }

    async run(message, input) {
        message.channel.send("https://i.imgur.com/zsCyhXz.png");
    }
}

module.exports = Maintenance;