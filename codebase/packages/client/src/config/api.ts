const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';
const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const API_VERSION = process.env.REACT_APP_API_VERSION ? process.env.REACT_APP_API_VERSION : '';
const SOCKET_URL = process.env.REACT_APP_WS_URL ? process.env.REACT_APP_WS_URL : '/';

export { PUBLIC_URL, API_URL, API_VERSION, SOCKET_URL };
