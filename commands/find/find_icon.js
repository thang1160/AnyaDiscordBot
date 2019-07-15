const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../lib.js').name;

class FindIcon extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'icon',
            group: 'find',
            memberName: 'icon',
            description: 'find an icon of unit'
        });
    }

    async run(message, input) {
        var unit = toTitleCase(input);
        var AW = unit.startsWith("Aw ");
        if(AW == true)  unit = unit.substring(3,unit.length);
        var AW2 = unit.startsWith("Aw2");
        if(AW2 == true) unit = unit.substring(4,unit.length);
        if(name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $('.image.image-thumbnail').length ) {
                    var output;
                    var check = false;
                    if(AW == true)  {
                        output = ($('.c3 td:first-child div a').attr('href'));
                        if(output)  {
                            message.channel.send(output);
                            check = true;
                        }
                    }
                    else if(AW2 == true){
                        output = ($('.c4 td:first-child div a').attr('href'));
                        if(output)  {
                            message.channel.send(output);
                            check = true;
                        }
                        output = ($('.c5 td:first-child div a').attr('href'));
                        if(output)  {
                            message.channel.send(output);
                            check = true;
                        }
                    }
                    else{
                        output = ($('.listtable.bgwhite tbody tr:nth-child(3) td:nth-child(2) div a').attr('href'));
                        if(output)  {
                            message.channel.send(output);
                            check = true;
                        }
                    }
                    if(check == false) message.channel.send(input + " does not exist");
                }
                else message.channel.send("icon " + unit + " " + "not found");
            }
        });
    }
}
// capitalize
function toTitleCase(str) {
    return str.replace(/\w+('s)?/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = FindIcon;