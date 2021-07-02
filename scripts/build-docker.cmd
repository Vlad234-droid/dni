@echo off

setlocal

cd ..

if "%NEXUS_ACCESS_TOKEN%"=="" (
    set NEXUS_ACCESS_TOKEN=%*
)

if "%NEXUS_ACCESS_TOKEN%"=="" (
    echo ERROR: Nexus accest token is not set.
    echo Set NEXUS_ACCESS_TOKEN environment variable or pass access token as a parameter
    goto completed
)

docker build ^
   --progress plain ^
   --tag dni_local:latest ^
   --build-arg NEXUS_ACCESS_TOKEN=%NEXUS_ACCESS_TOKEN% ^
   --build-arg NODE_ENV=ppe ^
   --build-arg PUBLIC_URL=/diversity-and-inclusion ^
   --build-arg REACT_APP_API_URL=/api ^
   --build-arg REACT_APP_WS_URL=/socket.io ^
   --build-arg REACT_APP_OURTESCO_URL=https://ppe.ourtesco.com ^
   --file dockerfiles/dni-frontend_docker_build.Dockerfile ^
   .


rem Login to TescoAzure tenant
rem az login --tenant f55b1f7d-7a7f-49e4-9b90-55218aad89f8

rem Login to ACR (dev)
rem az acr login --name euwdev213daicontainerregistry

rem List image tags
rem az acr repository show-tags --name euwdev213daicontainerregistry --repository dev/diversity-and-inclusion --orderby time_desc

rem docker tag dni_local:latest euwdev213daicontainerregistry.azurecr.io/dev/diversity-and-inclusion:latest
rem docker push euwdev213daicontainerregistry.azurecr.io/dev/diversity-and-inclusion:latest

rem Login to ACR (ppe)
rem az acr login --name eunppe213daicontainerregistry

rem List image tags
rem az acr repository show-tags --name eunppe213daicontainerregistry --repository ppe/diversity-and-inclusion --orderby time_desc

rem docker tag dni_local:latest eunppe213daicontainerregistry.azurecr.io/ppe/diversity-and-inclusion:latest
rem docker push eunppe213daicontainerregistry.azurecr.io/ppe/diversity-and-inclusion:latest

:completed

rem cd scripts
endlocal
