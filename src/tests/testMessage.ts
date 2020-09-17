import Config from '../config/config';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import TelegramServer from 'telegram-test-api';
import onMessage from '../handlers/message';
import { assert } from 'chai';

// TODO: Outdated test. Bring up to date.
// 'telegram-test-api' only supports string messages
// so we can't use the library to send photos.
// A custom Express server would be used for the test instead.

// Unit test: should scan test photo correctly
// Send images/test_photo.png to the bot

// Expected response:
// Mild Splendour of the various-vested Night!
// Mother of wildly-working visions! haill
// I watch thy gliding, while with watery light
// Thy weak eye glimmers through a fleecy veil;
// And when thou lovest thy pale orb to shroud
// Behind the gather’d blackness lost on high;
// And when thou dartest from the wind-rent cloud
// Thy placid lightning o’er the awaken’d sky.

describe('Message test', () => {
  const serverConfig = {port: 9001};
  const apiKey = Config.API_KEY;
  let server; 
  let client;
  let bot: TelegramBot;

  before(() => {
    server = new TelegramServer(serverConfig);
    return server.start().then(() => {
      client = server.getClient(apiKey);
      const opt = {polling: true, baseApiUrl: server.ApiURL};
      bot = new TelegramBot(apiKey, opt);
      bot.on('message', (msg: Message) => {
        onMessage(bot, msg);
      });
    });
  });
 
  after(() => {
    bot.stopPolling();
    return server.stop();
  });
 
  it('should reply with original message', async () => {
    // Send test message
    const text = 'Hello bot';
    const message = client.makeMessage(text);
    await client.sendMessage(message);

    // Wait for update
    const updates = await client.getUpdates();
    console.log(`Client received messages: ${JSON.stringify(updates.result)}`);

    // Assert result
    assert(updates.result.length == 1, 'Updates queue should contain one message!');
    assert(updates.result[0].message.text == text, 'Wrong message!');
  });
});