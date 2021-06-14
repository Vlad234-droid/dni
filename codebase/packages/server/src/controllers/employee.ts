import { Request, Response } from 'express';
import {
  profileInfoExtractor,
  findNetworksBy,
  createNetworkRelation,
  removeNetworkRelation,
  findEventsBy,
  createEventRelation,
  removeEventRelation,
  findEventsParticipants,
  findNetworksParticipants,
} from '../services';
import { executeSafe } from '../utils';

const getProfile: Middleware = (req: Request, res: Response) => {
  return executeSafe(res, async () =>
    res.status(200).json(await profileInfoExtractor(req, res)),
  );
};

const getNetworksByEmployeeNumber: Middleware = (req: Request, res: Response) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findNetworksBy(req.params.employeeNumber)),
  );
};

const addNetworkToEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, networkId } = req.body;

    await createNetworkRelation(employeeNumber, networkId);

    return res.json({
      message: 'Network was added to employee',
      body: { employeeNumber, networkId },
    });
  });
};

const deleteNetworkFromEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, networkId } = req.body;

    await removeNetworkRelation(employeeNumber, networkId);

    return res.json({
      message: `Network with ID ${networkId} was deleted from employee with NUMBER ${employeeNumber}`,
      body: { employeeNumber, networkId },
    });
  });
};

const getEventsByEmployeeNumber: Middleware = (req: Request, res: Response) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findEventsBy(req.params.employeeNumber)),
  );
};

const addEventToEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, eventId } = req.body;

    await createEventRelation(employeeNumber, eventId);

    return res.json({
      message: 'Event was added to employee',
      body: { employeeNumber, eventId },
    });
  });
};

const deleteEventFromEmployee: Middleware = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, eventId } = req.body;

    await removeEventRelation(employeeNumber, eventId);

    return res.json({
      message: `Event with ID ${eventId} was deleted from employee with NUMBER ${employeeNumber}`,
      body: { employeeNumber, eventId },
    });
  });
};

const getEventsParticipants: Middleware = (_, res) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findEventsParticipants()),
  );
};

const getNetworksParticipants: Middleware = (_, res) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findNetworksParticipants()),
  );
};

export {
  getProfile,
  getNetworksByEmployeeNumber,
  addNetworkToEmployee,
  deleteNetworkFromEmployee,
  getEventsByEmployeeNumber,
  addEventToEmployee,
  deleteEventFromEmployee,
  getEventsParticipants,
  getNetworksParticipants,
};
