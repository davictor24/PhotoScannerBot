import bot from './bot';
import onMessage from './handlers/message';
import { Message } from 'node-telegram-bot-api';

bot.on('message', (msg: Message) => {
  onMessage(bot, msg);
});