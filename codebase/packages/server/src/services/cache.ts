import NodeCache from 'node-cache';

// TODO: https://www.npmjs.com/package/node-cache#options
const cache = new NodeCache();

export const getInstance = () => cache;
