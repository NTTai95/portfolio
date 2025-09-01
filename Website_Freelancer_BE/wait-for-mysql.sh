#!/bin/sh
set -e

host="$1"
port="$2"
user="$3"
password="$4"
shift 4

echo "Waiting for MySQL at $host:$port with user '$user'..."

while true; do
  output=$(mysql -h "$host" -P "$port" -u"$user" -p"$password" -e "SELECT 1;" 2>&1)
  status=$?

  if [ $status -eq 0 ]; then
    echo "MySQL is up - executing command"
    break
  else
    echo "MySQL not ready yet... Error:"
    echo "$output"
    sleep 2
  fi
done

exec "$@"
