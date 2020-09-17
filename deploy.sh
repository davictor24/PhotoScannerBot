#!/bin/bash
heroku container:login
docker push registry.heroku.com/photo-scanner-bot/app
heroku container:release app -a photo-scanner-bot