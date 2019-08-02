const commando = require('discord.js-commando');
const Discord = require('discord.js');
const expTable = require('../../library/exp_table').expTable;

class ExpCalculator extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'gold',
            group: 'calculate',
            memberName: 'gold',
            description: 'calculate gold needed'
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
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 20000 });

            if (rarity == "gold") {
                message.channel.send("Gold is not avaiable yet")
            }
            else if (rarity == "plat") {
                message.channel.send("How many of these fodder do you want to use? (add space between answer)\nBlackArmor, Freude, Placere, PlatArmor, Sariette\nEx: 5 2 1 3 1")
                collector.on('collect', message => {
                    if(message.content.split(" ").length != 5) {
                        message.channel.send("Input wrong!")
                        return;
                    }
                    const PlatArmor = message.content.split(" ")[3];
                    const Placere = message.content.split(" ")[2];
                    const Freude = message.content.split(" ")[1];
                    const BlackArmor = message.content.split(" ")[0];
                    if(message.content.split(" ")[4] == 0) var base = 1;
                    else var base = 1.1;
                    // message.channel.send("plat " + PlatArmor + " Placere " + Placere + " Freude " + Freude + " Black " + BlackArmor + " Base " + base)
                    message.channel.send("Minimum gold require is: " + goldRequiredPlat(PlatArmor,Placere,Freude,BlackArmor,from,base,expToLvUp));
                    collector.stop();
                })
            }
            else if (rarity == "black") {
                message.channel.send("How many of these fodder do you want to use? (add space between answer)\nBlackArmor, Farah, Placere, PlatArmor, Sariette\nEx: 5 2 1 3 1")
                collector.on('collect', message => {
                    if(message.content.split(" ").length != 5) {
                        message.channel.send("Input wrong!")
                        return;
                    }
                    const PlatArmor = message.content.split(" ")[3];
                    const Placere = message.content.split(" ")[2];
                    const Farah = message.content.split(" ")[1];
                    const BlackArmor = message.content.split(" ")[0];
                    if(message.content.split(" ")[4] == 0) var base = 1;
                    else var base = 1.1;
                    // message.channel.send("Minimum gold require is :")
                    message.channel.send("Minimum gold require is: " + goldRequiredBlack(PlatArmor,Placere,Farah,BlackArmor,from,base,expToLvUp));
                    collector.stop();
                })
            }
        }
    }
}

//black
function goldRequiredBlack(PlatArmor, Placere, Farah, BlackArmor, lvBase, base, expToLvUp) {
    var goldTotal = 0;
    var expGet = 0;
    for (; PlatArmor > 0;) {
        var goldBase = (lvBase - 1) * 40 + 200;
        goldTotal += goldBase * 4;
        PlatArmor--;
        expGet = 8000 * base;
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
            if(lvBase == 98) return goldTotal;
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
            if(lvBase == 98) return goldTotal;
        }
    }

    for (; Placere > 0;) {
        goldTotal += (lvBase - 1) * 40 + 200;
        Placere--;
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
            if(lvBase == 98) return goldTotal;
        }
    }
    for (; Farah > 0;) {
        goldTotal += (lvBase - 1) * 40 + 200;
        Farah--;
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
            if(lvBase == 98) return goldTotal;
        }
    }
    return goldTotal;
}

//plat
function goldRequiredPlat(PlatArmor, Placere, Freude, BlackArmor, lvBase, base, expToLvUp) {
    var goldTotal = 0;
    var expGet;
    for (; PlatArmor > 0;) {
        var goldBase = (lvBase - 1) * 40 + 200;
        goldTotal += goldBase * 4;
        PlatArmor--;
        expGet = 8000 * base;
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][4]) {
                expToLvUp = expTable[j][4] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][4];
                lvBase++;
            }
            if(lvBase == 98) return goldTotal;
        }
        console.log(lvBase + " " + expToLvUp);
    }
    for (; BlackArmor > 0;) {
        var goldBase = (lvBase - 1) * 40 + 200;
        goldTotal += goldBase * 4;
        BlackArmor--;
        expGet = 40000 * base;
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][4]) {
                expToLvUp = expTable[j][4] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][4];
                lvBase++;
            }
            if(lvBase == 98) return goldTotal;
        }
    }
    for (; Placere > 0;) {
        goldTotal += (lvBase - 1) * 40 + 200;
        Placere--;
        expGet = 10000 * base;
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][4]) {
                expToLvUp = expTable[j][4] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][4];
                lvBase++;
            }
            if(lvBase == 98) return goldTotal;
        }
    }
    for (; Freude > 0;) {
        goldTotal += (lvBase - 1) * 40 + 200;
        Freude--;
        expGet = 19000 * base;
        expGet -= expToLvUp;
        lvBase++;

        for (let j = lvBase - 1; ; j++) {
            if (expGet < expTable[j][4]) {
                expToLvUp = expTable[j][4] - expGet;
                expGet = 0;
                break;
            } else {
                expGet -= expTable[j][4];
                lvBase++;
            }
            if(lvBase == 98) return goldTotal;
        }
        console.log(lvBase + " " + expToLvUp);
    }
    return goldTotal;
}

module.exports = ExpCalculator;