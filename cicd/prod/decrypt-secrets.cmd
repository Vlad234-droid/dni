@echo off

rem az login

sops  --decrypt secrets.enc.json > secrets.json
    