const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';
const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const SOCKET_URL = process.env.REACT_APP_WS_URL ? process.env.REACT_APP_WS_URL : '/socket.io';

export { PUBLIC_URL, API_URL, SOCKET_URL };
