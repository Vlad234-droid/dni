import { createBrowserHistory as createHistory } from 'history';
import { PUBLIC_URL as appRootUrl } from 'config/api';

const history = createHistory({ basename: appRootUrl });

export type History = typeof history;

export default history;
