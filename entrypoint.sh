#!/bin/bash
envsubst '${API_URL}' < /usr/share/nginx/html/js/main.js > /usr/share/nginx/html/js/main.js.tmp
cp /usr/share/nginx/html/js/main.js.tmp /usr/share/nginx/html/js/main.js
exec "$@"