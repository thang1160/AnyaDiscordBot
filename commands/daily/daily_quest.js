const commando = require('discord.js-commando');

class DailyQuest extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'daily',
            group: 'daily',
            memberName: 'daily',
            description: 'list of daily quest and drop'
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
        var check = false;
        var date = parseInt(input);
        if (date >= 0 && date <= 6) {
            console.log(textArray[date]);
            check = true;
        }
        else if (input.length >= 3) {
            for (let i = 0; i < 7; i++) {
                var element = textArray[i].toLowerCase();
                if (element.includes(input)) {
                    console.log(number[i] + "\n" + element);
                    check = true;
                }
            }
            if (check == false)    console.log("Input wrong, please try again");
        }
        else    console.log("Input too short, please try again");
        console.log("Note: Sunday is 0, Monday is 1, and so on till 6\n");
    }
}

module.exports = DailyQuest;
