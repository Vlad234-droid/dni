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
   --build-arg PUBLIC_URL=/ ^
   --build-arg REACT_APP_API_URL=/api ^
   --build-arg REACT_APP_WS_URL=/socket.io ^
   --build-arg REACT_APP_LOGOUT_URL=/sso/logout ^
   --build-arg REACT_APP_OURTESCO_URL=https://ppe.ourtesco.com ^
   --file dockerfiles/dni-frontend_docker_build.Dockerfile ^
   .

:completed

rem cd scripts
endlocal
