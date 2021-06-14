import { createBrowserHistory as createHistory } from 'history';

const history = createHistory({ basename: process.env.PUBLIC_URL });

export type History = typeof history;

export default history;
