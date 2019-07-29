const commando = require('discord.js-commando');

class Maintenance extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'maintenance',
            group: 'timer',
            memberName: 'maintenance',
            description: 'how long until maintaince start & end'
        });
    }

    async run(message, input) {
        var japanTime = new Date().toLocaleString("en-US", { timeZone: "Japan" });
        japanTime = new Date(japanTime);
        message.channel.send('JAP time: ' + japanTime.toLocaleString());

        var curr = new Date;
        var thurs = curr.getDate() - curr.getDay() + 4;
        var thursday = new Date(curr.setDate(thurs)).toLocaleString("en-US", { timeZone: "Japan" });
        var maintenance = new Date(thursday);
        maintenance.setHours(11);
        maintenance.setMinutes(0);
        maintenance.setSeconds(0);
        if (japanTime > maintenance === false)
            message.channel.send('Maintenance start: ' + maintenance.toLocaleString());
        else {
            var curr = new Date;
            var thurs = curr.getDate() - curr.getDay() + 4 + 7;
            var thursday = new Date(curr.setDate(thurs)).toLocaleString("en-US", { timeZone: "Japan" });
            var maintenance = new Date(thursday);
            maintenance.setHours(11);
            maintenance.setMinutes(0);
            maintenance.setSeconds(0);
            message.channel.send('Maintenance start: ' + maintenance.toLocaleString());
        }
        var milidif = maintenance-japanTime;
        var daydif = Math.floor(milidif/1000/3600/24);
        var hourdif = Math.floor((milidif - daydif*24*3600*1000)/1000/3600);
        var minutedif = Math.floor((milidif - daydif*24*3600*1000 - hourdif*3600*1000)/1000/60);
        message.channel.send('Maintenance will start in ' + daydif + ' day(s)      ' + hourdif + ' hour(s)      ' + minutedif + ' minute(s)');
        maintenance.setHours(15);
        message.channel.send('Maintenance end: ' + maintenance.toLocaleString());
        var milidif = maintenance-japanTime;
        var daydif = Math.floor(milidif/1000/3600/24);
        var hourdif = Math.floor((milidif - daydif*24*3600*1000)/1000/3600);
        var minutedif = Math.floor((milidif - daydif*24*3600*1000 - hourdif*3600*1000)/1000/60);
        message.channel.send('Maintenance will end in ' + daydif + ' day(s)      ' + hourdif + ' hour(s)      ' + minutedif + ' minute(s)');
    }
}

module.exports = Maintenance;
