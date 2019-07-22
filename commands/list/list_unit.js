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
                if ($('table').length) {
                    var length = $("table:first-child tbody tr td div").length - 2;
                    for (let i = 0; i < length; i++) {
                        var jquery = "table:first-child tbody tr td div:nth-child(" + (i + 1) + ") a img";
                        var link = $(jquery).attr('data-src').toString();
                        link = link.match(/(http(s?):)([/|.|\w|\s|-|\%])*\.(?:png)/g);
                        jquery = "table:first-child tbody tr td div:nth-child(" + (i + 1) + ") a";
                        var name = $(jquery).attr('href');
                        name = name.substr(6);
                        message.channel.send(name, {
                            files: [{ attachment: link.toString() }]
                        });
                    }
                    if($("table").eq(1).attr('class') != "listtable bgwhite") {
                        var length = $("table:nth-child(2) tbody tr td div").length - 2;
                        for (let i = 0; i < length; i++) {
                            var jquery = "table:nth-child(2) tbody tr td div:nth-child(" + (i + 1) + ") a img";
                            var link = $(jquery).attr('data-src').toString();
                            link = link.match(/(http(s?):)([/|.|\w|\s|-|\%])*\.(?:png)/g);
                            jquery = "table:nth-child(2) tbody tr td div:nth-child(" + (i + 1) + ") a";
                            var name = $(jquery).attr('href');
                            name = name.substr(6);
                            message.channel.send(name, {
                                files: [{ attachment: link.toString() }]
                            });
                        }
                    }
                }
                else message.channel.send(unit + " doesn't exist");
            }
        });
    }
}

module.exports = FindAff;