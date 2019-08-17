const commando = require('discord.js-commando');

class No extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'no',
            group: 'random',
            memberName: 'no',
            description: 'just no'
        });
    }

    async run(message, input) {
        var textArray = [
            'https://i.imgur.com/zsCyhXz.png',
            'https://cdn.discordapp.com/attachments/599639992309907465/604247517214932992/Ehh_No_Minion.gif'
        ];
        var randomNumber = Math.floor(Math.random()*textArray.length);
        message.channel.send(textArray[randomNumber]);
    }
}

module.exports = No;