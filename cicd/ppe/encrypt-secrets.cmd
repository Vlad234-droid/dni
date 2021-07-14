@echo off

rem Login to TescoAzure tenant
rem az login --tenant f55b1f7d-7a7f-49e4-9b90-55218aad89f8

sops ^
    --encrypt ^
    --azure-kv https://eun-ppe-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/91fcf860f4934e24b36c745e01dba718 ^
    secrets.json > secrets.enc.json
    