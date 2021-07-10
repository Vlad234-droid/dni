import { Request, Response } from 'express';
import {
  profileInfoExtractor,
  createNetworkRelation,
  removeNetworkRelation,
  createEventRelation,
  removeEventRelation,
  findEventsParticipants,
  findNetworksParticipants,
  colleagueUUIDExtractor,
  EmailNotificationSettings,
  storeSettings,
  findSettings,
  fetchPersonalEmail,
  createPersonalEmail,
  updatePersonalEmail,
} from '../services';
import { executeSafe } from '../utils';

const getProfile: Middleware = (req: Request, res: Response) => {
  return executeSafe(res, async () => res.status(200).json(await profileInfoExtractor(req, res)));
};

const addNetworkToEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    const { networkId } = req.body;

    await createNetworkRelation(colleagueUUID!, networkId);

    return res.json({
      message: 'Network was added to employee',
      body: { networkId },
    });
  });
};

const deleteNetworkFromEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const paramNetworkId = req.params.networkId;

    if (isNaN(Number(paramNetworkId))) {
      return res.status(400).json({
        error: 'networkId path param is invalid.',
      });
    }

    const networkId = Number(paramNetworkId);
    const colleagueUUID = await colleagueUUIDExtractor(req, res);

    await removeNetworkRelation(colleagueUUID!, networkId);

    return res.json({
      message: `Network with ID ${networkId} was deleted from employee`,
      body: { networkId },
    });
  });
};

const addEventToEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    const { eventId } = req.body;

    await createEventRelation(colleagueUUID!, eventId);

    return res.json({
      message: 'Event was added to employee',
      body: { eventId },
    });
  });
};

const deleteEventFromEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const paramEventId = req.params.eventId;

    if (isNaN(Number(paramEventId))) {
      return res.status(400).json({
        error: 'eventId path param is invalid.',
      });
    }

    const eventId = Number(paramEventId);
    const colleagueUUID = await colleagueUUIDExtractor(req, res);

    await removeEventRelation(colleagueUUID!, eventId);

    return res.json({
      message: `Event with ID ${eventId} was deleted from employee`,
      body: { eventId },
    });
  });
};

const getEventsParticipants: Middleware = (_, res) => {
  return executeSafe(res, async () => res.status(200).json(await findEventsParticipants()));
};

const getNetworksParticipants: Middleware = (_, res) => {
  return executeSafe(res, async () => res.status(200).json(await findNetworksParticipants()));
};

const getPersonalEmail: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => res.json(await fetchPersonalEmail(req, res)));
};

const addPersonalEmail: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => res.json(await createPersonalEmail(req, res)));
};

const refreshPersonalEmail: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => res.json(await updatePersonalEmail(req, res)));
};

const refreshSetting: Middleware = async (req: Request<{}, {}, EmailNotificationSettings>, res: Response) => {
  return executeSafe(res, async () => {
    const colleagueUUID = await colleagueUUIDExtractor(req, res);

    return res.json(await storeSettings(colleagueUUID!, req.body));
  });
};

const getSetting: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const colleagueUUID = await colleagueUUIDExtractor(req, res);

    return res.json(await findSettings(colleagueUUID!));
  });
};

export {
  getProfile,
  addNetworkToEmployee,
  deleteNetworkFromEmployee,
  addEventToEmployee,
  deleteEventFromEmployee,
  getEventsParticipants,
  getNetworksParticipants,
  refreshSetting,
  getSetting,
  getPersonalEmail,
  addPersonalEmail,
  refreshPersonalEmail,
};
