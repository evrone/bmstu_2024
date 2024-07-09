#!/bin/bash

RED="\e[32m"
ENDCOLOR="\e[0m"

export $(grep -v '^#' .env | xargs)

echo "Trying to get forwarding port..."

PORTS=$(ssh-agent ssh -A meta-proxy source /home/meta-proxy/get-port)

INTERNAL_EXPOSED_PORT=${PORTS% *}
PUBLIC_EXPOSED_PORT=${PORTS#* }
export HOST=$(echo "https://wheremylikes.com:$PUBLIC_EXPOSED_PORT")
export INSTAGRAM_REDIRECT_URI="$HOST/$INSTAGRAM_REDIRECT_URL"

echo -e "Starting forwarding $RED$PUBLIC_EXPOSED_PORT:3000$ENDCOLOR"
echo -e "ONLINE ON $RED$HOST$ENDCOLOR"

(ssh -qCN -R $INTERNAL_EXPOSED_PORT:localhost:3000 meta-proxy; [ "$?" -lt 2 ] && kill "$$") &
(ssh -qCN -D 49830 meta-proxy; [ "$?" -lt 2 ] && kill "$$") &
(tsocks rails s; [ "$?" -lt 2 ] && kill "$$" 2>/dev/null) &

wait
