import TelegramBot, { Message } from 'node-telegram-bot-api';
import Config from '../config/config';
import scanPhoto from '../ocr/scanPhoto';

export default async function onMessage(bot: TelegramBot, msg: Message): Promise<void> {
  console.log(msg);
  if (msg.photo == undefined) return;

  const id = msg.chat.id;
  const photo = await bot.getFile(msg.photo.pop().file_id);
  const photoUrl = `https://api.telegram.org/file/bot${Config.API_KEY}/${photo.file_path}`;
  const text = await scanPhoto(photoUrl);
  if (text.length == 0) return;

  const response = `I found some text in the photo:\n\n${text}`;
  console.log(response);
  bot.sendMessage(id, response);
}