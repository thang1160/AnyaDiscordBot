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
        if(name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                var text;
                if ($('.gcstyle.bgwhite.hsbullet tr').length >= 5) {
                    const length = $( '.gcstyle.bgwhite.hsbullet tr' ).length;
                    var jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child('+(length-1)+') td:first-child';
                    var name1 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child('+(length-1)+') td:nth-child(2)';
                    var des1 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child('+(length-1)+') td:nth-child(3)';
                    var stat1 = $(jquery).text().trim();

                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child('+length+') td:first-child';
                    var name2 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child('+length+') td:nth-child(2)';
                    var des2 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child('+length+') td:nth-child(3)';
                    var stat2 = $(jquery).text().trim();

                    text = name1 + "\n" + des1 + "\n" + stat1 + "\n\n" + name2 + "\n" + des2 + "\n" + stat2;
                    message.channel.send(text);
                }
                if (!text) {
                    text = "unit don't have AW2 or only have one path";
                    message.channel.send(text);
                }
            }
        });
    }
}

module.exports = CompareClass;
