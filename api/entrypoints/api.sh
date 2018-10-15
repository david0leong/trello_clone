#!/bin/sh

set -e

if [ -f /app/tmp/pids/server.pid ]; then
  rm /app/tmp/pids/server.pid
fi

bundle exec rails db:migrate 2>/dev/null || bundle exec rails db:create

exec "$@"
