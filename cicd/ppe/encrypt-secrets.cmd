@echo off

az login

sops ^
    --encrypt 
    --azure-kv https://eun-ppe-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/91fcf860f4934e24b36c745e01dba718 ^
    secrets.json > secrets.enc.json
    