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
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    const { networkId } = req.body;

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
    const colleagueUUID = await colleagueUUIDExtractor(req, res);
    const { eventId } = req.body;

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

export {
  getProfile,
  addNetworkToEmployee,
  deleteNetworkFromEmployee,
  addEventToEmployee,
  deleteEventFromEmployee,
  getEventsParticipants,
  getNetworksParticipants,
};
