const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

class CompareClass extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'compare',
            group: 'compare',
            memberName: 'compare',
            description: 'compare AW2ver1 and AW2ver2 of an unit'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        var link = "https://aigis.fandom.com/wiki/" + unit;
        
        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $( '.gcstyle.bgwhite.hsbullet tr' ).length == 5) {
                    var name1 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(4) td:first-child').text();
                    var des1 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(4) td:nth-child(2)').text();
    
                    var name2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(5) td:first-child').text();
                    var des2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(5) td:nth-child(2)').text();
    
                    var text = name1 + "\n" + des1 + "\n" + name2 + "\n" + des2;
                    message.channel.send(text);
                }
                var text = "unit don't have AW2 or only have one path";
                message.channel.send(text);
            }
        });
    }
}

module.exports = CompareClass;