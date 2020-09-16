require('dotenv').config();
import Config from '../config/config';
import TelegramBot from 'node-telegram-bot-api';
import TelegramServer from 'telegram-test-api';
import onMessage from '../events/message';
import { assert } from 'chai';

describe('Bot test', () => {
  const serverConfig = {port: 19001};
  const apiKey = Config.API_KEY;
  let server;
  let client;

  beforeEach(() => {
    server = new TelegramServer(serverConfig);
    return server.start().then(() => {
      client = server.getClient(apiKey);
    });
  });
 
  afterEach(function () {
    // this.slow(2000);
    // this.timeout(10000);
    return server.stop();
  });
 
  it('should reply with original message', async () => {
    // this.slow(400);
    // this.timeout(800);

    // Start bot for testing
    console.log(server.ApiURL);
    const opt = {polling: true, baseApiUrl: server.ApiURL};
    const bot = new TelegramBot(apiKey, opt);
    bot.on('message', onMessage);

    // Send test message
    const text = 'Hello bot';
    const message = client.makeMessage(text);
    await client.sendMessage(message);

    // Wait for update
    const updates = await client.getUpdates();
    console.log(`Client received messages: ${JSON.stringify(updates.result)}`);

    // Assert result
    assert(updates.result.length == 1, 'Updates queue should contain one message!')
    assert(updates.result[0].message.text == text, 'Wrong message!')
  });
});