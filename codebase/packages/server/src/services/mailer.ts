import { spawnWorkers } from './workers';

export const massMailing = <T, P>(list: T[], payload: P) => {
  spawnWorkers('colleague-sender', list, payload);
};
