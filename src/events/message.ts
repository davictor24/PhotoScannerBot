import bot from '../bot';

export default function onMessage(msg) {
    console.log(msg);
    const id = msg.chat.id;
    const text = msg.text;
    // Send back the original message
    bot.sendMessage(id, text);
}