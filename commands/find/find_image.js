const commando = require('discord.js-commando');
const puppeteer = require('puppeteer');


class FindImage extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'image',
            group: 'find',
            memberName: 'image',
            description: 'find an image of unit'
        });
    }

    async run(message, input) {
        var unit = toTitleCase(input);
        var link = "https://aigis.fandom.com/wiki/" + unit;
        
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto(link);
        
        const textContent = await page.evaluate(() => {
            if ( $( '.lzyPlcHld.lzyTrns.lzyLoaded' ).length ) {
                return document.querySelector('.lzyPlcHld.lzyTrns.lzyLoaded').getAttribute('src')
            }
            else return input + "not found";
        });

        message.channel.send(textContent);
        await browser.close();
    }
}
// capitalize
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = FindImage;
