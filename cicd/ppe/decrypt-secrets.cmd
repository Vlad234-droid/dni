@echo off

az login

sops ^
    --decrypt ^
    secrets.enc.json > secrets.json
    