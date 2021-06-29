import { Request, Response } from 'express';
import {
  profileInfoExtractor,
  createNetworkRelation,
  removeNetworkRelation,
  createEventRelation,
  removeEventRelation,
  findEventsParticipants,
  findNetworksParticipants,
  colleagueExtractor,
} from '../services';
import { executeSafe } from '../utils';

const getProfile: Middleware = (req: Request, res: Response) => {
  return executeSafe(res, async () => res.status(200).json(await profileInfoExtractor(req, res)));
};

const addNetworkToEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const employee = await colleagueExtractor(req, res);
    const { networkId } = req.body;

    await createNetworkRelation(employee!.colleagueUUID, networkId);

    return res.json({
      message: 'Network was added to employee',
      body: { networkId },
    });
  });
};

const deleteNetworkFromEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const employee = await colleagueExtractor(req, res);
    const { networkId } = req.body;

    await removeNetworkRelation(employee!.colleagueUUID, networkId);

    return res.json({
      message: `Network with ID ${networkId} was deleted from employee`,
      body: { networkId },
    });
  });
};

const addEventToEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const employee = await colleagueExtractor(req, res);
    const { eventId } = req.body;

    await createEventRelation(employee!.colleagueUUID, eventId);

    return res.json({
      message: 'Event was added to employee',
      body: { eventId },
    });
  });
};

const deleteEventFromEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const employee = await colleagueExtractor(req, res);
    const { eventId } = req.body;

    await removeEventRelation(employee!.colleagueUUID, eventId);

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
