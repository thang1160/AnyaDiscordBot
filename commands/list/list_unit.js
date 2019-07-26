const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

class FindAff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'list',
            memberName: 'list',
            description: 'list of units with specific class. Ex: !list vampire lords'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        var link = "https://aigis.fandom.com/wiki/Category:" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                var exist = false;
                for (let i = 0; i < 50; i++) {
                    var img = $("td:contains('edit stats') div:first-child a img").eq(i).attr('data-src');
                    if(img !== undefined)
                    {
                        img = img.match(/(http(s?):)([/|.|\w|\s|-|\%])*\.(?:png)/g).toString();
                        var name = $("td:contains('edit stats') div:first-child a img").eq(i).attr('alt');
                        name = name.substr(0,name.length - 5);
                        name = name.replace(/(&#039;)/g,'\'')
                        message.channel.send(name.trim(), {
                            files: [{ attachment: img.toString() }]
                        });
                        exist = true;
                    }
                }
                if(exist == false)  message.channel.send("can't get list of " + unit + "\ntry again with `s` after name of class")
            }
        });
    }
}

module.exports = FindAff;
