const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

class FindLink extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'link',
            group: 'find',
            memberName: 'link',
            description: 'find link on wiki of an unit'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        var temp = unit.split(" ");
        if(temp.length == 1);
        else{
            unit = temp[0];
            var length = temp.length;
            for (let i = 1; i < temp.length; i++) {
                unit = unit + "_" + temp[i]; 
            }
        }
        if(name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;
        
        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $( '.ui-text.ui-spacing' ).length) {
                    message.channel.send(link);
                }
                else message.channel.send(unit + " doesn't exist");
            }
        });
    }
}

module.exports = FindLink;