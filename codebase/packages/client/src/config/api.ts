const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';
const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const SOCKET_URL = process.env.REACT_APP_WS_URL ? process.env.REACT_APP_WS_URL : '/socket.io';

function buildPublicPath(subPath: string): string {
    return PUBLIC_URL === '/' ? subPath : `${PUBLIC_URL}${subPath}`;
};

export { PUBLIC_URL, API_URL, SOCKET_URL, buildPublicPath };
