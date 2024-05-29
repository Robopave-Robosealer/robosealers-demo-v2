#!/bin/bash
pm2 stop all
pm2 start /home/ubuntu/apps/robosealers-demo-v2/server/configs/server.js --name robosealers # Adjust the start command as needed
