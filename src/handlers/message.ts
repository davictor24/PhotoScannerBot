import TelegramBot, { Message } from "node-telegram-bot-api";

export default function onMessage(bot: TelegramBot, msg: Message): void {
  console.log(msg);
  const id = msg.chat.id;
  const response = msg.text;
  // Send back the original message
  bot.sendMessage(id, response);
}