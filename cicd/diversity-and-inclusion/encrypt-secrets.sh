#!/bin/sh

# Login to TescoAzure tenant
# az login --tenant f55b1f7d-7a7f-49e4-9b90-55218aad89f8

if [ -z "$1" ]
then
  echo "Usage: "
  echo "  decrypt-secrets.sh <env_name>"
  echo "  where <env_name>: one of dev, ppe, prod"
  exit -1
fi

env_name=`echo "$1" | tr '[:upper:]' '[:lower:]'`
env_dir="`pwd`/$env_name"

case $env_name in
  dev)
    azure_kv='https://euw-dev-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/280d8d295bf0450ab34269fe9da68b60'
    ;;
  ppe)
    azure_kv='https://eun-ppe-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/91fcf860f4934e24b36c745e01dba718'
    ;;
  prod)
    azure_kv='https://eun-prod-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/84ae442c2470498a890991bdf40193b7'
    ;;
  *)
    echo "Environment '$env_name' is not supported for encrypting sercets"
    exit -2
    ;;
esac

if [ -f "$env_dir/secrets.json" ] 
then
  sops --encrypt --azure-kv $azure_kv --output $env_dir/secrets.enc.json $env_dir/secrets.json
else
  echo "File $env_dir/secrets.json doesn't exists" 
fi

