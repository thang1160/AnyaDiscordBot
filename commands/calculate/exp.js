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
                if (message.content.toLocaleLowerCase() == "y") {
                    collector.stop()
                    calculateFodder(expNeed, rarity, 1.1, message, from, expToLvUp);
                } else if (message.content.toLocaleLowerCase() == "n") {
                    collector.stop()
                    calculateFodder(expNeed, rarity, 1, message, from, expToLvUp);
                }
            })
        }
    }
}

function calculateFodder(expNeed, rarity, base, message, from, expToLvUp) {
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
        message.channel.send("Combine with following order to get minimum gold required\n5 Plat Armor = 1 Black Armor = 4 Placere = 2 Farah\nAlways check pin for more information")
        for (var i = 0; i <= 4; i++) {
            for (let j = 0; j <= 1; j++) {
                for (var k = 0; k <= 1; k++) {
                    for (var l = 0; l <= Math.floor(expNeed / (40000 * base)); l++) {
                        var expLeft = expNeed - (i * 8000 + j * 10000 + k * 20000 + l * 40000) * base;
                        if (expLeft < 0) break;
                        if (expLeft >= 0 && expLeft < (8000 * base)) {
                            message.channel.send("BlackArmor: " + l + "   Farah: " + k + "   Placere: " + j + "   PlatArmor: " + i + "   Exp need left: " + Math.ceil(expLeft));
                            var goldTotal = goldRequired(i, j, k, l, from, expNeed, base, expToLvUp);
                            message.channel.send("Gold required for these fodder (beta): " + goldTotal);
                        }
                    }
                }
            }
        }
    }

}

function goldRequired(PlatArmor, Placere, Farah, BlackArmor, lvBase, expNeed, base, expToLvUp) {
    var goldTotal = 0;
    var expGet;
    for (; PlatArmor > 0;) {
        var goldBase = (lvBase - 1) * 40 + 200;
        if (PlatArmor >= 4) {
            goldTotal += goldBase * 4;
            PlatArmor -= 4;
            expGet = 8000 * base * 4;
        } else {
            goldTotal += goldBase * PlatArmor;
            expGet = 8000 * base * PlatArmor;
            PlatArmor = 0;
        }
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][5]) {
                expToLvUp = expTable[j][5] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][5];
                lvBase++;
            }
        }
    }
    for (; BlackArmor > 0;) {
        var goldBase = (lvBase - 1) * 40 + 200;
        goldTotal += goldBase * 4;
        BlackArmor--;
        expGet = 40000 * base;
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][5]) {
                expToLvUp = expTable[j][5] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][5];
                lvBase++;
            }
        }
    }
    if (Placere == 1) {
        goldTotal += (lvBase - 1) * 40 + 200;
        expGet = 10000 * base;
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][5]) {
                expToLvUp = expTable[j][5] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][5];
                lvBase++;
            }
        }
    }
    if (Farah == 1) {
        goldTotal += (lvBase - 1) * 40 + 200;
        expGet = 20000 * base;
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][5]) {
                expToLvUp = expTable[j][5] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][5];
                lvBase++;
            }
        }
    }
    return goldTotal;
    // console.log(lvBase + "/" + expToLvUp + "/" + goldTotal);
}

module.exports = ExpCalculator;
