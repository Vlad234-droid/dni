const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';
const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '/api';
const WS_URL = process.env.REACT_APP_WS_URL ? process.env.REACT_APP_WS_URL : '/socket.io';
const OURTESCO_URL = process.env.REACT_APP_OURTESCO_URL
  ? process.env.REACT_APP_OURTESCO_URL
  : 'https://www.ourtesco.com';

export { PUBLIC_URL, API_URL, WS_URL, OURTESCO_URL };
