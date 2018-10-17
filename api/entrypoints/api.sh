#!/bin/sh

set -e

if [ -f /api/tmp/pids/server.pid ]; then
  rm /api/tmp/pids/server.pid
fi

bundle exec rails db:migrate 2>/dev/null || bundle exec rails db:create

exec "$@"
