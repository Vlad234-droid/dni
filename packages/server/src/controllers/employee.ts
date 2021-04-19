import { Request, Response } from 'express';
import {
  profileInfoExtractor,
  findNetworksBy,
  createNetworkRelation,
  removeNetworkRelation,
  findEventsBy,
  createEventRelation,
  removeEventRelation,
} from '../services';
import { executeSafe } from '../utils';

const getProfile: Middleware = (_, res) => {
  return executeSafe(res, async () =>
    res.status(200).json(await profileInfoExtractor(res)),
  );
};

const getNetworksByEmployeeNumber = (req: Request, res: Response) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findNetworksBy(req.params.employeeNumber)),
  );
};

const addNetworkToEmployee = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, networkId } = req.body;

    await createNetworkRelation(employeeNumber, networkId);

    return res.json({
      message: 'Network was added to employee',
      body: { employeeNumber, networkId },
    });
  });
};

const deleteNetworkFromEmployee = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, networkId } = req.body;

    await removeNetworkRelation(employeeNumber, networkId);

    return res.json({
      message: `Network with ID ${networkId} was deleted from employee with NUMBER ${employeeNumber}`,
      body: { employeeNumber, networkId },
    });
  });
};

const getEventsByEmployeeNumber = (req: Request, res: Response) => {
  return executeSafe(res, async () =>
    res.status(200).json(await findEventsBy(req.params.employeeNumber)),
  );
};

const addEventToEmployee = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, eventId } = req.body;

    await createEventRelation(employeeNumber, eventId);

    return res.json({
      message: 'Event was added to employee',
      body: { employeeNumber, eventId },
    });
  });
};

const deleteEventFromEmployee = async (req: Request, res: Response) => {
  return executeSafe(res, async () => {
    const { employeeNumber, eventId } = req.body;

    await removeEventRelation(employeeNumber, eventId);

    return res.json({
      message: `Event with ID ${eventId} was deleted from employee with NUMBER ${employeeNumber}`,
      body: { employeeNumber, eventId },
    });
  });
};

export {
  getProfile,
  getNetworksByEmployeeNumber,
  addNetworkToEmployee,
  deleteNetworkFromEmployee,
  getEventsByEmployeeNumber,
  addEventToEmployee,
  deleteEventFromEmployee,
};
