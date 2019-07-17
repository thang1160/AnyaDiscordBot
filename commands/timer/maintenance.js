const commando = require('discord.js-commando');

class Maintenance extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'maintenance',
            group: 'timer',
            memberName: 'maintenance',
            description: 'how long until maintaince start & finish'
        });
    }

    async run(message, input) {
        const today = new Date();
        var curr = new Date();
        var first = curr.getDate() - curr.getDay();
        var last = first + 4;

        var lastday = new Date(curr.setDate(last));
        if(lastday <= today) lastday = new Date(curr.setDate(last + 7));
        lastday = new Date(lastday.setHours(1));
        lastday = new Date(lastday.setMinutes(0));
        lastday = new Date(lastday.setSeconds(0));
        const thurday = lastday;

        var diffTime = Math.abs(thurday.getTime() - today.getTime());
        var totalDiffMinutes = Math.ceil(diffTime / (1000 * 60));
        var diffDays = parseInt(totalDiffMinutes/(60*24));
        var diffHours = parseInt((totalDiffMinutes - diffDays*24*60)/60);
        var diffMinutes = (totalDiffMinutes - diffDays*24)%60;
        message.channel.send(thurday);
        message.channel.send("Maintenance start in: \nDay(s): " + diffDays + "   Hour(s): " + diffHours + "   Minute(s): " + diffMinutes);

        lastday = thurday;
        lastday.setHours(thurday.getHours() + 5);
        diffTime = Math.abs(lastday.getTime() - today.getTime());
        totalDiffMinutes = Math.ceil(diffTime / (1000 * 60));
        diffDays = parseInt(totalDiffMinutes/(60*24));
        diffHours = parseInt((totalDiffMinutes - diffDays*24*60)/60);
        diffMinutes = (totalDiffMinutes - diffDays*24)%60;
        message.channel.send(lastday);
        message.channel.send("Maintenance finish in: \nDay(s): " + diffDays + "   Hour(s): " + diffHours + "   Minute(s): " + diffMinutes);
    }
}

module.exports = Maintenance;
