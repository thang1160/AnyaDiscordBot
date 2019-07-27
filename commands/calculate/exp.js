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
        else if(!['iron', 'bronze', 'silver', 'gold', 'sapphire', 'plat', 'black'].includes(arr[2]))
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
        }
    }
}

module.exports = ExpCalculator;