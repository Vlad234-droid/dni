@echo off

rem Login to TescoAzure tenant
rem az login --tenant f55b1f7d-7a7f-49e4-9b90-55218aad89f8

sops ^
  --encrypt ^
  --azure-kv https://eun-prod-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/84ae442c2470498a890991bdf40193b7 ^
  --output secrets.enc.json
  secrets.json
    