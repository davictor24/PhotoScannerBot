import bot from './bot';
import onMessage from './events/message';

bot.on('message', onMessage);