@echo off

az login

sops ^
    --encrypt 
    --azure-kv https://euw-dev-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/280d8d295bf0450ab34269fe9da68b60 ^ 
    secrets.json > secrets.enc.json
    