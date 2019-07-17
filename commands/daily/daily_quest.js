const commando = require('discord.js-commando');

class Maintenance extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'daily',
            group: 'daily',
            memberName: 'daily',
            description: 'list of daily quest and drop'
        });
    }

    async run(message, input) {
        message.channel.send("Note: Sunday is 0, Monday is 1, and so on till 6\n");
        var textArray = [
            'Demon crystal\nOrbs: Alchemist, Curse User, Puppeteer, Thief, Bowrider',
            'Armor\nOrbs: Archer, Dark Fighter, Healer, Rearguard Tactician, Gunner',
            'Spirit\nOrbs: Valkyrie, Pegasus Rider, Monk, Bandit, Feng Shui User',
            'Demon crystal\nOrbs: Soldier, Rogue, Pirate, Shaman, Bishop',
            'Affection items\nOrbs: Heavy Armor, Samurai, Magic Fencer, Vampire Hunter, Sailor',
            'Armor\nOrbs: Witch, Warlock, Vanguard Tactician, Ninja, Angel',
            'Spirit\nOrbs: Mage Armor, Ranger, Dancer, Dragon Rider, Priest Warrior'
        ];
        var date = parseInt(input);
        if(date != NaN)
        {
            if(date >= 0 && date <= 6)
                message.channel.send(textArray[date]);
        }
        else
            message.channel.send("Input wrong, please try again");
    }
}

module.exports = Maintenance;