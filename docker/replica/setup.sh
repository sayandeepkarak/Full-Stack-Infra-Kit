#!/bin/sh
set -e

echo "Waiting for primary..."
until pg_isready -h postgres -p 5432; do
  sleep 2
done

echo "Starting base backup..."

rm -rf /var/lib/postgresql/data/*

PGPASSWORD=secret pg_basebackup \
  -h postgres \
  -D /var/lib/postgresql/data \
  -U replicator \
  -Fp -Xs -P -R

echo "Starting replica..."
chown -R postgres:postgres /var/lib/postgresql/data
chmod 700 /var/lib/postgresql/data
exec su-exec postgres postgres