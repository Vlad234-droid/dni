@echo off

setlocal

cd ..

if "%NPM_ACCESS_TOKEN%"=="" (
    set NPM_ACCESS_TOKEN=%*
)

if "%NPM_ACCESS_TOKEN%"=="" (
    echo ERROR: Nexus accest token is not set.
    echo Set NPM_ACCESS_TOKEN environment variable or pass access token as a parameter
    goto completed
)

if "%REACT_APP_RECITE_ME_SERVICE_KEY%"=="" (
    echo ERROR: ReciteMe service key is not set.
    echo Set REACT_APP_RECITE_ME_SERVICE_KEY environment variable
    goto completed
)

docker build ^
   --progress plain ^
   --tag dni_local:latest ^
   --network host ^
   --build-arg HTTP_PROXY=http://10.251.0.42:80 ^
   --build-arg HTTPS_PROXY=http://10.251.0.42:80 ^
   --build-arg NODE_ENV=production ^
   --build-arg NODE_PORT=9000 ^
   --build-arg NPM_ACCESS_TOKEN=%NPM_ACCESS_TOKEN% ^
   --build-arg REACT_APP_RECITE_ME_SERVICE_KEY=%REACT_APP_RECITE_ME_SERVICE_KEY% ^
   --build-arg REACT_APP_CONTACT_API_ENABLED=false ^
   --build-arg PUBLIC_URL=/diversity-and-inclusion ^
   --build-arg REACT_APP_API_URL=/api ^
   --build-arg REACT_APP_WS_URL=/socket.io ^
   --build-arg REACT_APP_LOGOUT_URL=/sso/logout ^
   --build-arg REACT_APP_OURTESCO_URL=https://ppe.ourtesco.com ^
   --file dockerfiles/dni-frontend_docker_multistage_build.Dockerfile ^
   .

:completed

endlocal
