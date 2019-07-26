const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

class FindAff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'aff',
            group: 'find',
            memberName: 'aff',
            description: 'find aff stats of an unit \n example: !aff plat kanon'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        var gold = unit.startsWith("Gold");
        var platinum = unit.startsWith("Plat ");
        var black = unit.startsWith("Black");
        var link;
        if (gold == true) {
            link = "https://aigis.fandom.com/wiki/150_Affection_Bonus_-_Gold";
            unit = unit.substring(5, unit.length);
        }
        if (platinum == true) {
            link = "https://aigis.fandom.com/wiki/150_Affection_Bonus_-_Platinum";
            unit = unit.substring(5, unit.length);
        }
        if (black == true) {
            link = "https://aigis.fandom.com/wiki/150_Affection_Bonus_-_Black";
            unit = unit.substring(6, unit.length);
        }
        if (name[unit]) unit = name[unit];

        if (link) {
            request(link, function (err, resp, html) {
                if (!err) {
                    const $ = cheerio.load(html);
                    var jquery = "tr:contains('" + unit + "')";
                    for (let i = 0; i < 2; i++) {
                        var check = false;
                        var output = $(jquery).eq(i).html();
                        if (output) {
                            if(unit.includes("'")) {
                                var arr = unit.split('\'');
                                check  = output.includes(arr[0] + "&amp;#039;" + arr[1] + " Icon");
                            }
                            else check = output.includes(unit + " Icon");
                        }
                        if (check === true) break;
                    }
                    if (output && check === true) {
                        output = output.replace(/<[^>]*>/g, "\n");
                        output = output.replace(/\n+ /g, "\n");
                        output = output.replace(/(&apos;)/g, "\'");
                        output = output.replace(/(&lt;Not Implemented&gt;)/g, "150% bonus not implemented");
                        
                        message.channel.send(output.trim());
                    }
                    else
                        message.channel.send(unit + " not found");
                }
            });
        }
        else
            message.channel.send("you need to add rarity before unit's name");
    }
}

module.exports = FindAff;
