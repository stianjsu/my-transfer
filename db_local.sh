#!/usr/bin/env bash
set -a
source ./.env.local

while getopts 'spmg' opt; do
  case "$opt" in
    s)
      npm run db:studio
      exit 1
      ;;
    p)
      npm run db:push
      exit 1
      ;;
    m)
      
      npm run db:migrate
      exit 1
      ;;
    g)
      read -p "name for migration: " MIG_NAME
      npm run db:generate -- --name=$MIG_NAME
      exit 1
      ;;
  esac
done

echo "Missing input"
echo "  -s: start drizzle_studio"
echo "  -p: push db changes"
echo "  -m: migrate db"
echo "  -g: generate db migration"