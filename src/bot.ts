import Config from './config/config';
import TelegramBot from 'node-telegram-bot-api';

const apiKey = Config.API_KEY;
const opt = {polling: true};
const bot = new TelegramBot(apiKey, opt);

export default bot;