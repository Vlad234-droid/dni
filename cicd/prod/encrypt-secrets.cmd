@echo off

az login

sops ^
    --encrypt 
    --azure-kv https://eun-prod-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/84ae442c2470498a890991bdf40193b7 ^
    secrets.json > secrets.enc.json
    