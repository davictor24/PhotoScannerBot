import Config from '../config/config';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import TelegramServer from 'telegram-test-api';
import onMessage from '../handlers/message';
import { assert } from 'chai';

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