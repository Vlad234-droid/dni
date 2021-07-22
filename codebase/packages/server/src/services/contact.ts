import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { FetchError } from '@energon/fetch-client';
import { contactApiConnector, USER_UID_PREFIX, ApiMsgBody } from '@dni-connectors/contact-api';

import { prepareContext } from './context';

type Recipient = {
  destination: 'emailTo';
  address: string;
};

type EmailData = Record<string, string>;

type EmailAddressesFilter = {
  userId?: string;
  addressIdentifier?: string;
};

type EmailAddresses = {
  alias: string;
  emailAddress: string;
  addressIdentifier: string;
};

const PERSONAL_ALIAS = 'Personal';

const getContactApiConnector = async (req: Request, res: Response) => {
  const ctx = await prepareContext(req, res);
  return contactApiConnector(ctx);
};

const fetchPersonalEmail = async (
  colleagueUUID: string,
  req: Request,
  res: Response,
): Promise<EmailAddresses | undefined> => {
  const connector = await getContactApiConnector(req, res);

  try {
    const { data: result } = await connector.getEmailAddresses({
      params: { userId: `${USER_UID_PREFIX}:${colleagueUUID}` },
      traceId: uuidv4(),
    });

    return result.find(
      (email) => PERSONAL_ALIAS.localeCompare(email.alias, 'en', { sensitivity: 'base' }) === 0,
    ) as EmailAddresses;
  } catch (err) {
    if (FetchError.is(err) && err.status === 404) {
      // ignore NOT_FOUND error and fall-back to empty result
      return undefined;
    } else {
      throw err;
    }
  }
};

const createPersonalEmail = async (colleagueUUID: string, req: Request, res: Response) => {
  const connector = await getContactApiConnector(req, res);

  const { data: result } = await connector.createEmailAddress({
    params: { userId: `${USER_UID_PREFIX}:${colleagueUUID}` },
    traceId: uuidv4(),
    body: {
      ...req.body,
      alias: PERSONAL_ALIAS,
    },
  });

  return result;
};

const updatePersonalEmail = async (colleagueUUID: string, req: Request, res: Response) => {
  const connector = await getContactApiConnector(req, res);

  const { addressId } = req.params;

  const { data: result } = await connector.updateEmailAddress({
    params: {
      addressIdentifier: addressId as string,
      userId: `${USER_UID_PREFIX}:${colleagueUUID}`,
    },
    traceId: uuidv4(),
    body: req.body,
  });

  return result;
};

const sendEmails = async (recipients: Recipient[], data: EmailData, req: Request, res: Response) => {
  if (!process.env.MAILING_TEMPLATE_ID) {
    throw new Error("Can't execute without template id");
  }

  const connector = await getContactApiConnector(req, res);

  const { data: result } = await connector.sendMessages({
    params: {
      templateId: process.env.MAILING_TEMPLATE_ID,
    },
    traceId: uuidv4(),
    body: {
      recipients: recipients as ApiMsgBody['recipients'],
      data,
    },
  });

  return result;
};

export type { EmailAddressesFilter, EmailAddresses, Recipient, EmailData };

export { fetchPersonalEmail, createPersonalEmail, updatePersonalEmail, sendEmails };
