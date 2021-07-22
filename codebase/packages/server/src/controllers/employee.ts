import { Handler, Request, Response } from 'express';
import { getColleagueUuid } from '@dni-connectors/onelogin';
import {
  profileInfoExtractor,
  createNetworkRelation,
  removeNetworkRelation,
  createEventRelation,
  removeEventRelation,
  findEventsParticipants,
  findNetworksParticipants,
  EmailNotificationSettings,
  storeSettings,
  findSettings,
  fetchPersonalEmail,
  createPersonalEmail,
  updatePersonalEmail,
} from '../services';
import { executeSafe } from '../utils';

const getProfile: Handler = (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const profile = await profileInfoExtractor(req, res);
    res.status(200).json(profile);
  });
};

const addNetworkToEmployee: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const { networkId } = req.body;

    await createNetworkRelation(colleagueUUID!, networkId);

    res.json({
      message: 'Network was added to employee',
      body: { networkId },
    });
  });
};

const deleteNetworkFromEmployee: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const { networkId } = req.params;

    if (isNaN(Number(networkId))) {
      res.status(400).json({
        error: 'networkId path param is invalid.',
      });

      return;
    }

    //const networkId = Number(paramNetworkId);
    const colleagueUUID = getColleagueUuid(res);

    await removeNetworkRelation(colleagueUUID!, Number(networkId));

    res.json({
      message: `Network with ID ${networkId} was deleted from employee`,
      body: { networkId },
    });
  });
};

const addEventToEmployee: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const { eventId } = req.body;

    await createEventRelation(colleagueUUID!, eventId);

    res.json({
      message: 'Event was added to employee',
      body: { eventId },
    });
  });
};

const deleteEventFromEmployee: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    //const paramEventId = req.params.eventId;
    const { eventId } = req.params;

    if (isNaN(Number(eventId))) {
      res.status(400).json({
        error: 'eventId path param is invalid.',
      });

      return;
    }

    //const eventId = Number(paramEventId);
    const colleagueUUID = getColleagueUuid(res);
    await removeEventRelation(colleagueUUID!, Number(eventId));

    res.json({
      message: `Event with ID ${eventId} was deleted from employee`,
      body: { eventId },
    });
  });
};

const getEventsParticipants: Handler = (_, res: Response) => {
  executeSafe(res, async () => {
    const eventsParticipants = await findEventsParticipants();
    res.status(200).json(eventsParticipants);
  });
};

const getNetworksParticipants: Handler = (_, res: Response) => {
  executeSafe(res, async () => {
    const networksParticipants = await findNetworksParticipants();
    res.status(200).json(networksParticipants);
  });
};

const getPersonalEmail: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const personalEmail = await fetchPersonalEmail(colleagueUUID!, req, res);
    res.json(personalEmail);
  });
};

const addPersonalEmail: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const personalEmail = await createPersonalEmail(colleagueUUID!, req, res);
    res.json(personalEmail);
  });
};

const refreshPersonalEmail: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const updatedPersonalEmail = await updatePersonalEmail(colleagueUUID!, req, res);
    res.json(updatedPersonalEmail);
  });
};

const refreshSetting: Handler = async (req: Request<{}, {}, EmailNotificationSettings>, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const refreshedSetting = await storeSettings(colleagueUUID!, req.body);
    res.json(refreshedSetting);
  });
};

const getSetting: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const settings = await findSettings(colleagueUUID!);
    res.json(settings);
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
