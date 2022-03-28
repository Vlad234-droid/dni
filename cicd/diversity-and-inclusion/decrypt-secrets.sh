#!/bin/sh

# Login to TescoAzure tenant
# az login --tenant f55b1f7d-7a7f-49e4-9b90-55218aad89f8

if [ -z "$1" ]
then
  echo "Usage: "
  echo "  decrypt-secrets.sh <env_name>"
  echo "  where <env_name>: one of dev, ppe, prod"
  exit 1
fi

env_name=`echo "$1" | tr '[:upper:]' '[:lower:]'`
env_dir="`pwd`/$env_name"

if [ -f "$env_dir/secrets.enc.json" ] 
then
  sops --decrypt --output $env_dir/secrets.json $env_dir/secrets.enc.json
else
  echo "File $env_dir/secrets.enc.json doesn't exists" 
fi
