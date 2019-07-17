const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('find', 'Find');
bot.registry.registerGroup('timer', 'Timer');
bot.registry.registerGroup('compare', 'Compare');
bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(process.env.BOT_TOKEN);
