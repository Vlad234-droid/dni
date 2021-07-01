import { PUBLIC_URL } from 'config/constants';
import { createBrowserHistory as createHistory } from 'history';

const history = createHistory({ basename: PUBLIC_URL });

export type History = typeof history;

export default history;
