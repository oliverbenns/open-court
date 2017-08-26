#!/bin/bash

PROJECT_DIR=/var/www/apps/open-court

source ~/.profile

cd $PROJECT_DIR
pm2 delete open-court
pm2 start npm --name "open-court" -- start
# pm2 restart open-court
