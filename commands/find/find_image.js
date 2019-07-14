const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var map= {
    'Snekloli' : 'Orochihime',
    'Shampoo' : 'Jin-Guang Sheng-Pu',
    'Gelbro' : 'Gellius',
    'Shoka' : 'Shokatsuryou'
}

class FindImage extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'image',
            group: 'find',
            memberName: 'image',
            description: 'find an image of unit'
        });
    }

    async run(message, input) {
        var unit = toTitleCase(input);
        var AW = unit.startsWith("Aw ");
        if(AW == true)  unit = unit.substring(3,unit.length);
        var AW2 = unit.startsWith("Aw2");
        if(AW2 == true) unit = unit.substring(4,unit.length);
        if(map[unit]) unit = map[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $('.image.image-thumbnail').length ) {
                    var output;
                    var check = false;
                    if(AW == true)  {
                        output = ($('.InfoboxAW.ui-image a').attr('href'));
                        message.channel.send(output);
                        check = true;
                    }
                    else if(AW2 == true){
                        output = ($('.InfoboxAW2.ui-image a').attr('href'));
                        if(output)  {
                            message.channel.send(output);
                            check = true;
                        }
                        output = ($('.InfoboxAW2v1.ui-image a').attr('href'));
                        if(output)  {
                            message.channel.send(output);
                            check = true;
                        }
                        output = ($('.InfoboxAW2v2.ui-image a').attr('href'));
                        if(output)  {
                            message.channel.send(output);
                            check = true;
                        }
                    }
                    else{
                        output = ($('.InfoboxBase.ui-image a').attr('href'));
                        message.channel.send(output);
                        check = true;
                    }
                    if(check == false) message.channel.send(input + " does not exist");
                }
                else message.channel.send(unit + " " + "not found");
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

module.exports = FindImage;
