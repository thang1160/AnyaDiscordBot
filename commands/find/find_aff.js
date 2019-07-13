const commando = require('discord.js-commando');
const puppeteer = require('puppeteer');

class FindAff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'aff',
            group: 'find',
            memberName: 'aff',
            description: 'find aff stats of an unit'
        });
    }

    async run(message, input) {
        var unit = toTitleCase(input);
        var link = "https://aigis.fandom.com/wiki/" + unit;
        
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto(link);
        
        const textContent = await page.evaluate(() => {
            if ($('.listtable.bgwhite tr').length == 9){
                return $('.listtable.bgwhite tr')[2].getElementsByTagName("td")[11].innerText;
            }
            else if ($('.listtable.bgwhite tr').length == 10){
                return $('.listtable.bgwhite tr')[4].getElementsByTagName("td")[9].innerText;
            }
            else return "not found";
        });

        message.channel.send(unit + " " + textContent);
        await browser.close();
    }
}
// capitalize
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = FindAff;
