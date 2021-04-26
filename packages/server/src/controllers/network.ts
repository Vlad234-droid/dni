import { findNetworksParticipants } from '../services';
import { executeSafe } from '../utils';

const getNetworksParticipants: Middleware = (_, res) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findNetworksParticipants()),
  );
};

export { getNetworksParticipants };
