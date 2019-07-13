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
            if ( $( '.gcstyle.bgwhite.hsbullet tr' ).length == 5) {
                var temp = $('.gcstyle.bgwhite.hsbullet tr')[3];
                var name1 = temp.getElementsByTagName("td")[0].textContent;
                var des1 = temp.getElementsByTagName("td")[1].textContent;

                temp = $('.gcstyle.bgwhite.hsbullet tr')[4];
                var name2 = temp.getElementsByTagName("td")[0].textContent;
                var des2 = temp.getElementsByTagName("td")[1].textContent;

                return name1 + "\n" + des1 + "\n" + name2 + "\n" + des2;
            }
            else return "unit don't have AW2";
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