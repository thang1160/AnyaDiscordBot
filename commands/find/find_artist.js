const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

class FindArtist extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'artist',
            group: 'find',
            memberName: 'artist',
            description: 'find artist's websites of an unit'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        var temp = unit.split(" ");
        if(temp.length == 1);
        else{
            unit = "";
            for (let i = 0; i < temp.length-1; i++) {
                unit = unit + "_"; 
            }
            unit = unit + temp[length-1];
        }
        var link = "https://aigis.fandom.com/wiki/" + unit;
        var artist = null;
        request(link, function (err, resp, html) {
            if (!err) {
                var $ = cheerio.load(html);
                if ( $( '.ui-text.ui-spacing' ).length) {
                    artist = $(".ui-data").eq(1).text();
                }
                
            }
        });
	if(artist === null) message.channel.send(unit + " doesn't exist");
	else {
	    artist = artist.split(" ")[0];
	    link = https://aigis.fandom.com/wiki/Artists;
	    request(link, function (err, resp, html) {
                if (!err) {
            	    var $ = cheerio.load(html);
                    var jquery = "";
		    for(var i = 0; i < 4; i++) {
			jquery = "tr:contains('" + artist + "') td:nth-child(3) a";
			if($(jquery).eq(i).text() === undefined) break;
			else {
			    message.channel.send($(jquery).eq(i).text().trim() + "\n" + $(jquery).eq(i).attr("href").trim());
			}
		    }
                }
	    });
	}
    }
}

module.exports = FindArtist;
