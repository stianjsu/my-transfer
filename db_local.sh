#!/usr/bin/env bash
set -a
source .env.local

while getopts 'sp' opt; do
  case "$opt" in
    s)
      npm run db:studio
      exit 1
      ;;
    p)
      npm run db:push
      exit 1
      ;;
  esac
done