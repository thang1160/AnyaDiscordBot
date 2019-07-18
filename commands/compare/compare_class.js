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
        if (name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                var text;
                if ($('.gcstyle.bgwhite.hsbullet tr').length >= 5) {
                    const length = $('.gcstyle.bgwhite.hsbullet tr').length;
                    var jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child(' + (length - 1) + ') td:first-child';
                    var name1 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child(' + (length - 1) + ') td:nth-child(2)';
                    var des1 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child(' + (length - 1) + ') td:nth-child(3)';
                    var stat1 = $(jquery).text().trim();

                    var black = $('.categories').text().includes("Rarity:Black");

                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child(' + length + ') td:first-child';
                    var name2 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child(' + length + ') td:nth-child(2)';
                    var des2 = $(jquery).text().trim();
                    jquery = '.gcstyle.bgwhite.hsbullet tr:nth-child(' + length + ') td:nth-child(3)';
                    var stat2 = $(jquery).text().trim();

                    if (black) {
                        var output = $('.c4.numbers').first().text();
                        var lv99v1 = temp(output);
                        output = $('.c4 ').first().text();
                        output = output.replace(/<[^>]*>/g, "\n");
                        output = output.replace(/\n+ /g, "\n");
                        output = output.replace(/Lv1/g, "");
                        output = output.trim();
                        var arr1 = output.split('\n');

                        output = $('.c5.numbers').first().text();
                        var lv99v2 = temp(output);
                        output = $('.c5 ').first().text();
                        output = output.replace(/<[^>]*>/g, "\n");
                        output = output.replace(/\n+ /g, "\n");
                        output = output.replace(/Lv1/g, "");
                        output = output.trim();
                        var arr2 = output.split('\n');
                        text = name1 + "\n" + des1 + "\n" + stat1 + "\nLv99   " + lv99v1 + "   Block: " + arr1[6] + "   Cost-min: " + arr1[7] + "   Cost-max: " + arr1[8] + "\n\n" + name2 + "\n" + des2 + "\n" + stat2 + "\nLv99   " + lv99v2 + "   Block: " + arr2[6] + "   Cost-min: " + arr2[7] + "   Cost-max: " + arr2[8];
                    }
                    else
                        text = name1 + "\n" + des1 + "\n" + stat1 + "\n\n" + name2 + "\n" + des2 + "\n" + stat2;

                    message.channel.send(text);
                    message.channel.send("\n\nstats different is currently on beta, check pin for more information");
                }
                if (!text) {
                    text = "unit don't have AW2 or only have one path";
                    message.channel.send(text);
                }
            }
        });
    }
}

function temp(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
    output = output.replace(/Lv99/g, "");
    output = output.trim();
    var arr = output.split('\n');

    if (arr[3].length > 3) {
        var range = arr[3].substring(0, 3) + "/" + arr[3].substring(3, 6) + "/" + arr[3].substring(6, 9);
        return ("HP: " + arr[0] + "   ATK: " + arr[1] + "   DEF: " + arr[2] + "   Range: " + range);
    }
    else
        return ("HP: " + arr[0] + "   ATK: " + arr[1] + "   DEF: " + arr[2] + "   Range: " + arr[3]);
}

module.exports = CompareClass;
