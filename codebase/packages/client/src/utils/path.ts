import { PUBLIC_URL } from 'config/constants';

export const getPath = (to: string) => (PUBLIC_URL === '/' ? `/${to}` : `/${PUBLIC_URL}/${to}`);
