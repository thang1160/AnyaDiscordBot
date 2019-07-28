const commando = require('discord.js-commando');
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
        if (arr.length != 4 || isNaN(arr[0]) || isNaN(arr[1]) || isNaN(arr[3]))
            message.channel.send("Input wrong, please re-enter command like this:\n!exp `levelfrom` `levelto` `rarity` `expToLvUp`");
        else if (!['iron', 'bronze', 'silver', 'gold', 'sapphire', 'plat', 'black'].includes(arr[2]))
            message.channel.send("Rarity" + arr[2] + "isn't exist");
        else {
            var from = arr[0];
            var to = arr[1];
            var rarity = arr[2];
            var expToLvUp = arr[3];
            if (to.localeCompare(from) < 1) message.channel.send("input wrong fromLv must bigger than toLv");

            else {
                var j = 0;
                if (rarity == "bronze") j = 1;
                else if (rarity == "silver") j = 2;
                else if (rarity == "gold") j = 3;
                else if (rarity == "plat" || rarity == "sap") j = 4;
                else if (rarity == "black") j = 5;
                var expNeed = expToLvUp;
                for (let i = from; i < to - 1; i++) {
                    expNeed = +expNeed + +expTable[i][j];
                }
                message.channel.send(expNeed);
            }

            var platArmor, blackArmor, gold;
            var limitPArmor = Math.floor(expNeed / 8000);
            var limitBArmor = Math.floor(expNeed / 40000);

            if (i == 3) {
                var alegria;
                var limitG = Math.floor(expNeed / 18000);
                for (let i = 0; i <= Math.floor(expNeed / 8000); i++) {
                    for (let j = 0; j <= Math.floor(expNeed / 18000); j++) {
                        var expLeft = expNeed - i * 8000 - j * 18000;
                        if (expLeft < 0) break;
                        if (expLeft >= 0 && expLeft < 8000) {
                            message.channel.send("PlatArmor: " + i + "\tAlegria: " + j + "\tExp need left: " + expLeft);
                        }
                    }
                }
            }
            else if (i == 4) {
                var freude;
                var limitP = Math.floor(expNeed / 19000);
                for (let i = 0; i <= Math.floor(expNeed / 8000); i++) {
                    for (let j = 0; j <= Math.floor(expNeed / 19000); j++) {
                        var expLeft = expNeed - i * 8000 - j * 19000;
                        if (expLeft < 0) break;
                        if (expLeft >= 0 && expLeft < 8000) {
                            message.channel.send("PlatArmor: " + i + "\tFreude: " + j + "\tExp need left: " + expLeft);
                        }
                    }
                }
            }
            else if (i == 5) {
                var farah;
                var limitB = Math.floor(expNeed / 20000);
                for (let i = 0; i <= Math.floor(expNeed / 8000); i++) {
                    for (let j = 0; j <= Math.floor(expNeed / 20000); j++) {
                        for (let k = 0; k <= Math.floor(expNeed / 40000); k++) {
                            var expLeft = expNeed - i * 8000 - j * 20000 - k * 40000;
                            if (expLeft < 0) break;
                            if (expLeft >= 0 && expLeft < 8000) {
                                message.channel.send("BlackArmor: " + k + "PlatArmor: " + i + "\tFarah: " + j + "\tExp need left: " + expLeft);
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = ExpCalculator;
