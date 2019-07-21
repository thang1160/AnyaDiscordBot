const commando = require('discord.js-commando');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

class FindSkill extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'skill',
            group: 'find',
            memberName: 'skill',
            description: 'find skill of an unit. Ex: !skill ate or !skill saw ate'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        var saw = false;
        if(unit.includes("Saw ")) {
            saw = true;
            unit = unit.substr(3);
        }
        if(name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;
        if(saw === false)
        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $( '.ui-text.ui-spacing' ).length) {
                    var SAWIndex = $("tr:contains('Awakened')").index();
                    var skillName = $(".wikitable tbody tr:nth-child(2) td:nth-child(3)").text().trim();
                    var skillDes = $(".wikitable tbody tr:nth-child(2) td:nth-child(4)").text().trim();
                    var skillTime = "Reuse: " + $(".wikitable tbody tr:nth-child(2) td:nth-child(5)").text().trim() + "    Initial: " + $(".wikitable tbody tr:nth-child(2) td:nth-child(6)").text().trim();
                    message.channel.send(skillName + "\n" + skillDes + "\n" + skillTime + "\n----------");
                    
                    for (let i = 2; i < SAWIndex; i++) {
                        var jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:first-child";
                        skillName = "\n\n" + $(jquery).first().text().trim();
                        jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:nth-child(2)";
                        skillDes = $(jquery).first().text().trim();
                        jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:nth-child(3)";
                        skillTime = "Reuse: " + $(jquery).first().text().trim();
                        jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:nth-child(4)";
                        skillTime = skillTime + "    Initial: " + $(jquery).first().text().trim();
                        message.channel.send(skillName + "\n" + skillDes + "\n" + skillTime + "\n----------");
                    }
                }
                else message.channel.send(unit + " doesn't exist");
            }
        });
        if(saw === true)
        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                if ( $( '.ui-text.ui-spacing' ).length) {
                    var SAWIndex = $("tr:contains('Awakened')").index();
                    var SAWLastIndex = $(".wikitable tbody tr:last-child").index();
                    var jquery = ".wikitable tbody tr:nth-child(" + (SAWIndex+1) + ") td:nth-child(2)";
                    var skillName = $(jquery).first().text().trim();
                    jquery = ".wikitable tbody tr:nth-child(" + (SAWIndex+1) + ") td:nth-child(3)";
                    var skillDes = $(jquery).first().text().trim();
                    jquery = ".wikitable tbody tr:nth-child(" + (SAWIndex+1) + ") td:nth-child(4)";
                    var skillTime = "Reuse: " + $(jquery).first().text().trim();
                    jquery = ".wikitable tbody tr:nth-child(" + (SAWIndex+1) + ") td:nth-child(5)";
                    skillTime = skillTime + "    Initial: " + $(jquery).first().text().trim();
                    message.channel.send(skillName + "\n" + skillDes + "\n" + skillTime + "\n----------");
                    
                    for (let i = SAWIndex + 1; i <= SAWLastIndex; i++) {
                        var jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:first-child";
                        skillName = "\n\n" + $(jquery).first().text().trim();
                        jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:nth-child(2)";
                        skillDes = $(jquery).first().text().trim();
                        jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:nth-child(3)";
                        skillTime = "Reuse: " + $(jquery).first().text().trim();
                        jquery = ".wikitable tbody tr:nth-child(" + (i+1) + ") td:nth-child(4)";
                        skillTime = skillTime + "    Initial: " + $(jquery).first().text().trim();
                        message.channel.send(skillName + "\n" + skillDes + "\n" + skillTime + "\n----------");
                    }
                }
                else message.channel.send(unit + " doesn't exist");
            }
        });
    }
}

module.exports = FindSkill;