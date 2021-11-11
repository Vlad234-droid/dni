@echo off

rem Login to TescoAzure tenant
rem az login --tenant f55b1f7d-7a7f-49e4-9b90-55218aad89f8

sops ^
    --decrypt ^
    secrets.enc.json > secrets.json
    