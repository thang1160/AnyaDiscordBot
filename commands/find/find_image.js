const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

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
        var temp = functions.toTitleCase(input);
        var version = "";
        if(temp.includes(" Aa"))
        {
            version = "_AA";
        }
        if(temp.includes(" Aw2v1")) version += "_AW2v1";
        else if(temp.includes(" Aw2v2")) version += "_AW2v2";
        else if(temp.includes(" Aw2")) version += "_AW2";
        else if(temp.includes(" Aw")) version += "_AW";
        var unit = functions.delAW(temp);
        if(name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/File:" + unit + version + "_Render.png";

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $('.fullImageLink') ) {
                    var output = ($('.fullImageLink a').attr('href'));
                    if(output)  {
                        message.channel.send(output);
                    }
                    else message.channel.send(input + " " + "not found");
                }
                else message.channel.send(input + " " + "not found");
            }
        });
    }
}

module.exports = FindImage;
