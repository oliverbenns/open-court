#!/bin/bash

PROJECT_DIR=/var/www/apps/open-court

source ~/.profile

sudo chown -R $USER:$GROUP $PROJECT_DIR

cd $PROJECT_DIR

nvm install
nvm use
rm -rf node_modules # install from fresh, not from test builds to ensure we align versions
npm install
