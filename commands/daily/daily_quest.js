const commando = require('discord.js-commando');

class DailyQuest extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'daily',
            group: 'daily',
            memberName: 'daily',
            description: 'list of daily quest, drop and search for which day drop the orb'
        });
    }

    async run(message, input) {
        var textArray = {
            0: 'Demon crystal\nOrbs: Alchemist, Curse User, Puppeteer, Thief, Bowrider',
            1: 'Armor\nOrbs: Archer, Dark Fighter, Healer, Rearguard Tactician, Gunner',
            2: 'Spirit\nOrbs: Valkyrie, Pegasus Rider, Monk, Bandit, Feng Shui User',
            3: 'Demon crystal\nOrbs: Soldier, Rogue, Pirate, Shaman, Bishop',
            4: 'Affection items\nOrbs: Heavy Armor, Samurai, Magic Fencer, Vampire Hunter, Sailor',
            5: 'Armor\nOrbs: Witch, Warlock, Vanguard Tactician, Ninja, Angel',
            6: 'Spirit\nOrbs: Mage Armor, Ranger, Dancer, Dragon Rider, Priest Warrior'
        }
        var number = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        }
        var temp = input;
        if (!input) {
            var d = new Date();
            var input = d.getDay()
        }
        if (input >= 0 && input <= 6) {
            for (let i = 0; i < 7; i++) {
                if (input == i) {
                    message.channel.send("====> Today " + textArray[i]);
                }
                else message.channel.send(number[i] + " - " + textArray[i]);
            }
        }
        else if (temp.length >= 3) {
            for (let i = 0; i < 7; i++) {
                var element = textArray[i].toLowerCase();
                if (element.includes(temp)) {
                    message.channel.send(number[i] + "\n" + textArray[i]);
                }
            }
        }
        else
            message.channel.send("Input too short, please try again");
    }
}

module.exports = DailyQuest;