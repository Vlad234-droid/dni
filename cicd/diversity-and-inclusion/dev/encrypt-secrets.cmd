@echo off

rem Login to TescoAzure tenant
rem az login --tenant f55b1f7d-7a7f-49e4-9b90-55218aad89f8

sops ^
  --encrypt ^
  --azure-kv https://euw-dev-213-dai-gl.vault.azure.net/keys/diversity-and-inclusion-sops-key/280d8d295bf0450ab34269fe9da68b60 ^
  secrets.json > secrets.enc.json
    