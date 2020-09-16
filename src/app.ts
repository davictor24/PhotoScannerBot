require('dotenv').config();
import { Config } from './config/config';
import TelegramBot from 'node-telegram-bot-api';

let apiKey = Config.API_KEY;
let opt = {polling: true};

let bot = new TelegramBot(apiKey, opt);

bot.on('message', msg => {
    console.log(msg);

    let id = msg.chat.id;
    let text = msg.text;
    // Send back the original message
    bot.sendMessage(id, text);
});