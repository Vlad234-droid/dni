import { Handler, Request, Response } from 'express';
import { getColleagueUuid } from '@dni-connectors/onelogin';
import { v4 as uuidv4 } from 'uuid';
import {
  profileInfoExtractor,
  createNetworkRelation,
  removeNetworkRelation,
  createEventRelation,
  removeEventRelation,
  findEventsParticipants,
  findNetworksParticipants,
  EmailNotificationSettings,
  ShareStory,
  storeSettings,
  findSettings,
  fetchPersonalEmail,
  createPersonalEmail,
  updatePersonalEmail,
  sendShareStoryEmail,
  sendConfirmationEmailToNewEmail,
  sendConfirmationEmailToOldEmail,
  sendConfirmationEmailSuccess,
  storeTokenSettings,
  findTokenSettingsAndInvalidate,
} from '../services';
import { executeSafe, executeSequentially } from '../utils';
import { getConfig } from '../config/config-accessor';

const config = getConfig();

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
    const { eventId } = req.params;

    if (isNaN(Number(eventId))) {
      res.status(400).json({
        error: 'eventId path param is invalid.',
      });

      return;
    }

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
    const personalEmail = await fetchPersonalEmail(colleagueUUID!);
    res.json(personalEmail);
  });
};

const addPersonalEmail: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const { emailAddress } = req.body;
    const personalEmail = await createPersonalEmail(colleagueUUID!, emailAddress);
    res.json(personalEmail);
  });
};

const refreshPersonalEmail: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const { emailAddress, addressIdentifier } = req.body;
    const updatedPersonalEmail = await updatePersonalEmail(colleagueUUID!, emailAddress, addressIdentifier);
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

const shareStory: Handler = async (req: Request<{}, {}, ShareStory>, res: Response) => {
  executeSafe(res, async () => {
    const {
      networkTitle: markdownNetworkTitle,
      storyTitle: colleagueStoryTitle,
      story: colleagueFullStory,
      name: colleagueName,
      location: colleagueLocation,
    } = req.body;

    sendShareStoryEmail({
      markdownNetworkTitle,
      colleagueStoryTitle,
      colleagueFullStory,
      colleagueName,
      colleagueLocation,
    });

    res.json(req.body);
  });
};

const sendPersonalEmailConfirmation: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const { emailAddress, oldEmailAddress } = req.body;

    const token = uuidv4();
    const EXPIRATION_HOUR = 8;

    const tokenSettings = await storeTokenSettings(colleagueUUID!, {
      expires: String(new Date().getTime() + EXPIRATION_HOUR * 60 * 60 * 1000),
      token: token,
      payload: req.body,
    });

    const task1 = async () =>
      await sendConfirmationEmailToOldEmail(colleagueUUID!, { newEmailAddress: emailAddress, oldEmailAddress });
    const task2 = async () =>
      await sendConfirmationEmailToNewEmail(colleagueUUID!, {
        newEmailAddress: emailAddress,
        confirmLink: `${config.applicationBaseUrl()}${config.applicationUrlTemplateConfirmation()}`.replace(
          /%\w+%/,
          token,
        ),
      });

    executeSequentially([task1, task2], 2000);

    res.json({
      ...tokenSettings,
      ...req.body,
    });
  });
};

const refreshPersonalEmailByToken: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const colleagueUUID = getColleagueUuid(res);
    const { token } = req.params;

    const tokenSettings = await findTokenSettingsAndInvalidate(colleagueUUID!, token);

    const { emailAddress, addressIdentifier } = tokenSettings.payload || {};

    sendConfirmationEmailSuccess(colleagueUUID!, { newEmailAddress: emailAddress });

    res.json({ ...(await updatePersonalEmail(colleagueUUID!, emailAddress, addressIdentifier)), ...tokenSettings });
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
  shareStory,
  sendPersonalEmailConfirmation,
  refreshPersonalEmailByToken,
};
