const TelegramBot = require('node-telegram-bot-api');
const commands = require('./src/commands');
require('dotenv').config();

console.log('Bot is starting...');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true
});

console.log('Bot is running!');

// Text message handler
bot.on('message', (msg) => {
    if (msg.text) {
        console.log('Received message:', msg.text);
        msg.text === '/start' ? commands.Start(bot, msg) : commands.Text(bot, msg);
    } else if (msg.document || msg.photo || msg.video) {
        console.log('Received media message');
        commands.Messages(bot, msg);
    }
});
