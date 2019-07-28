const commando = require('discord.js-commando');
const Discord = require('discord.js');
const expTable = require('../../library/exp_table').expTable;

class ExpCalculator extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'exp',
            group: 'calculate',
            memberName: 'exp',
            description: 'calculate exp needed. Ex: !exp `levelfrom` `levelto` `rarity` `expToLvUp`   (platinum and sapphire are plat and sap)'
        });
    }

    async run(message, input) {
        var arr = input.split(" ");
        var from = arr[0];
        var to = arr[1];
        var rarity = arr[2];
        var expToLvUp = arr[3];
        var j = 0;
        if (rarity == "bronze") j = 1;
        else if (rarity == "silver") j = 2;
        else if (rarity == "gold") j = 3;
        else if (rarity == "plat" || rarity == "sap") j = 4;
        else if (rarity == "black") j = 5;

        if (arr.length != 4 || isNaN(arr[0]) || isNaN(arr[1]) || isNaN(arr[3]) || arr[0] > 98)
            message.channel.send("Input wrong, please re-enter command like this:\n!exp `levelfrom` `levelto` `rarity` `expToLvUp`");
        else if (!['iron', 'bronze', 'silver', 'gold', 'sapphire', 'plat', 'black'].includes(arr[2]))
            message.channel.send("Rarity" + arr[2] + "isn't exist");
        else if (expToLvUp > expTable[from - 1][j] || to.localeCompare(from) < 1) {
            message.channel.send("Input wrong, please re-enter command like this:\n!exp `levelfrom` `levelto` `rarity` `expToLvUp`");
        }
        else {
            var expNeed = expToLvUp;
            for (let i = from; i < to - 1; i++) {
                expNeed = +expNeed + +expTable[i][j];
            }
            message.channel.send(expNeed);

            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
            message.channel.send("Do you have Sariette? (y/n)")
            collector.on('collect', message => {
                if (message.content == "y") {
                    calculateFodder(expNeed, rarity, 1.1, message);
                } else if (message.content == "n") {
                    calculateFodder(expNeed, rarity, 1, message);
                }
            })
        }
    }
}

function calculateFodder(expNeed, rarity, base, message) {
    if (rarity == "gold") {
        for (var i = 0; i <= Math.floor(expNeed / (8000 * base)); i++) {
            for (var j = 0; j <= Math.floor(expNeed / (18000 * base)); j++) {
                var expLeft = expNeed - (i * 8000 + j * 18000) * base;
                if (expLeft < 0) break;
                if (expLeft >= 0 && expLeft < (8000 * base)) {
                    var output = "PlatArmor: " + i + "   Alegria: " + j + "   Exp need left: " + Math.ceil(expLeft);
                    if (Math.ceil(expLeft) / 1750 > 0)
                        output += " (" + Math.floor(Math.ceil(expLeft) / 1750) + " Plaisir, " + Math.ceil(expLeft) % 1750 + "exp)";
                    message.channel.send(output);
                }
            }
        }
    }
    else if (rarity == "plat") {
        message.channel.send("1 Black Armor = 4 Placere = 5 Plat Armor")
        for (var i = 0; i <= 4; i++) {
            for (let j = 0; j <= 3; j++) {
                for (var k = 0; k <= Math.floor(expNeed / (19000 * base)); k++) {
                    for (var l = 0; l <= Math.floor(expNeed / (40000 * base)); l++) {
                        var expLeft = expNeed - (i * 8000 + j * 10000 + k * 19000 + l * 40000) * base;
                        if (expLeft < 0) break;
                        if (expLeft >= 0 && expLeft < (8000 * base)) {
                            message.channel.send("BlackArmor: " + l + "   Freude: " + k + "   Placere: " + j + "   PlatArmor: " + i + "   Exp need left: " + Math.ceil(expLeft));

                        }
                    }
                }
            }
        }
    }
    else if (rarity == "black") {
        message.channel.send("1 Black Armor = 2 Farah = 4 Placere = 5 Plat Armor")
        for (var i = 0; i <= 4; i++) {
            for (let j = 0; j <= 1; j++) {
                for (var k = 0; k <= 1; k++) {
                    for (var l = 0; l <= Math.floor(expNeed / (40000 * base)); l++) {
                        var expLeft = expNeed - (i * 8000 + j * 10000 + k * 20000 + l * 40000) * base;
                        if (expLeft < 0) break;
                        if (expLeft >= 0 && expLeft < (8000 * base)) {
                            message.channel.send("BlackArmor: " + l + "   Farah: " + k + "   Placere: " + j + "   PlatArmor: " + i + "   Exp need left: " + Math.ceil(expLeft));
                        }
                    }
                }
            }
        }
    }

}

module.exports = ExpCalculator;
