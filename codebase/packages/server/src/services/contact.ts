import { Request, Response } from 'express';
import { contactApiConnector, USER_UID_PREFIX, ApiMsgBody } from '@dni-connectors/contact-api';
import { prepareContext } from './context';
import { v4 as uuidv4 } from 'uuid';

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

const fetchPersonalEmail = async (colleagueUUID: string, req: Request, res: Response) => {
  const connector = await getContactApiConnector(req, res);

  const emails: EmailAddresses[] =
    (
      await connector.getEmailAddresses({
        params: { userId: `${USER_UID_PREFIX}:${colleagueUUID}` },
        traceId: uuidv4(),
      })
    ).data || [];

  return emails.find((email) => email.alias === PERSONAL_ALIAS);
};

const createPersonalEmail = async (colleagueUUID: string, req: Request, res: Response) => {
  const connector = await getContactApiConnector(req, res);

  return (
    await connector.createEmailAddress({
      params: { userId: `${USER_UID_PREFIX}:${colleagueUUID}` },
      traceId: uuidv4(),
      body: {
        ...req.body,
        alias: PERSONAL_ALIAS,
      },
    })
  ).data;
};

const updatePersonalEmail = async (colleagueUUID: string, req: Request, res: Response) => {
  const connector = await getContactApiConnector(req, res);

  const { addressId } = req.params;

  return (
    await connector.updateEmailAddress({
      params: {
        addressIdentifier: addressId as string,
        userId: `${USER_UID_PREFIX}:${colleagueUUID}`,
      },
      traceId: uuidv4(),
      body: req.body,
    })
  ).data;
};

const sendEmails = async (recipients: Recipient[], data: EmailData, req: Request, res: Response) => {
  if (!process.env.MAIL_TAMPLATE_ID) {
    throw new Error("Can't execute without template id");
  }

  const connector = await getContactApiConnector(req, res);

  return (
    await connector.sendMessages({
      params: {
        templateId: process.env.MAIL_TAMPLATE_ID,
      },
      traceId: uuidv4(),
      body: {
        recipients: recipients as ApiMsgBody['recipients'],
        data,
      },
    })
  ).data;
};

export type { EmailAddressesFilter, EmailAddresses, Recipient, EmailData };

export { fetchPersonalEmail, createPersonalEmail, updatePersonalEmail, sendEmails };
