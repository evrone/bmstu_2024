#!/bin/bash

export $(cat .env | xargs)

export INSTAGRAM_REDIRECT_URI="$HOST/$INSTAGRAM_REDIRECT_URL"

rails s