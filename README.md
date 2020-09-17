[![Build Status](https://travis-ci.com/davictor24/PhotoScannerBot.svg?branch=master)](https://travis-ci.com/davictor24/PhotoScannerBot)

# PhotoScannerBot
Telegram Bot for scanning text in photos. Try it out [here](http://t.me/PhotoScannerBot).

## Testing functionality with a custom bot
Node is required to run the project. Docker is optional.

1. Create a bot using [BotFather](https://t.me/botfather). Save the API key (token) for the new bot.
2. Clone the project and run ```npm install```.
3. Export the API key as an environment variable ```API_KEY```. 
4. Run ```npm start```. Alternatively, to use Docker, run ```./docker_build.sh``` and ```./docker_run.sh``` (or paste the commands if using a non UNIX-based OS).
5. Test your bot by sending a photo.
