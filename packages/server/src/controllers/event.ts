import { findEventsParticipants } from '../services';
import { executeSafe } from '../utils';

const getEventsParticipants: Middleware = (_, res) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findEventsParticipants()),
  );
};

export { getEventsParticipants };
