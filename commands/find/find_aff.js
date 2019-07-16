const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;

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
        var unit = toTitleCase(input);
        var gold = unit.startsWith("Gold");
        var platinum = unit.startsWith("Plat ");
        var black = unit.startsWith("Black");
        var link;
        if(gold == true)
        {
            link = "https://aigis.fandom.com/wiki/150_Affection_Bonus_-_Gold";
            unit = unit.substring(5, unit.length);
        }
        if(platinum == true)
        {
            link = "https://aigis.fandom.com/wiki/150_Affection_Bonus_-_Platinum";
            unit = unit.substring(5, unit.length);
        }
        if(black == true)
        {
            link = "https://aigis.fandom.com/wiki/150_Affection_Bonus_-_Black";
            unit = unit.substring(6, unit.length);
        }
        if(name[unit]) unit = name[unit];
        
        if(link)
        {
            request(link, function (err, resp, html) {
                if (!err) {
                        const $ = cheerio.load(html);
                        var jquery = "tr:contains('" + unit + "')";
                        var output = $(jquery).html();
                        if(output)
                        {
                            output = output.replace(/<[^>]*>/g,"\n");
                            output = output.replace(/\n+/g,"\n");
                            message.channel.send(output);
                        }
                        else
                            message.channel.send(input + " not found");
                }
            });
        }
        else
            message.channel.send("you need to add rarity before unit's name");
    }
}
// capitalize
function toTitleCase(str) {
    return str.replace(/\w+('s)?/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = FindAff;