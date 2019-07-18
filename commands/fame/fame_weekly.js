const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');

class Fame_Weekly extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'weekly',
            group: 'fame',
            memberName: 'weekly',
            description: 'weekly quests detail'
        });
    }

    async run(message, input) {
        var link = "https://aigis.fandom.com/wiki/Fame";
        
        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                var li = $('.weekly ul li').text();
                message.channel.send(li);
            }
        });
    }
}

module.exports = Fame_Weekly;