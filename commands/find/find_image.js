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

    async run(message, unit) {
        var link = "https://aigis.fandom.com/wiki/" + unit;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link);
        // const textContent = await page.evaluate(() => document.querySelector('.lzyPlcHld.lzyTrns.lzyLoaded').getAttribute('src'));
        
        const textContent = await page.evaluate(() => {
            if ( $( '.lzyPlcHld.lzyTrns.lzyLoaded' ).length ) {
                return document.querySelector('.lzyPlcHld.lzyTrns.lzyLoaded').getAttribute('src')
            }
            else return "not found";
        });

        message.channel.send(textContent);
        await browser.close();
    }
}

module.exports = FindImage;