import { createBrowserHistory as createHistory } from 'history';

const history = createHistory();

export type History = typeof history;

export default history;
