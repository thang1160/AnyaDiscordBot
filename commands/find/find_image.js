const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');

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
        var link = "https://aigis.fandom.com/wiki/" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $('.image.image-thumbnail').length ) {
                    var output;
                    if(AW == true)  output = ($('.InfoboxAW.ui-image a').attr('href'));
                    else if(AW2 == true){
                        output = ($('.InfoboxAW2v1.ui-image a').attr('href'));
                        if(output)  console.log(output);
                        output = ($('.InfoboxAW2v2.ui-image a').attr('href'));
                    }
                    else    output = ($('.InfoboxBase.ui-image a').attr('href'));
                    if(output) message.channel.send(output);
                    else message.channel.send(input + " does not exist");
                }
                else message.channel.send(unit + " " + "not found");
            }
        });
    }
}
// capitalize
function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = FindImage;
