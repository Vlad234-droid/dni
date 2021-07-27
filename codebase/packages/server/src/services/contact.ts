import { v4 as uuidv4 } from 'uuid';

import { FetchError } from '@energon/fetch-client';
import { contactApiConnector, USER_UID_PREFIX, ApiMsgBody } from '@dni-connectors/contact-api';

import { clientContext } from '../context';
import { getConfig } from '../config/config-accessor';

type Recipient = {
  destination: 'emailTo';
  address: string;
  colleagueUUID: string;
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

const getContactApiConnector = async () => {
  const ctx = await clientContext(getConfig());
  return contactApiConnector(ctx);
};

const fetchPersonalEmail = async (
  colleagueUUID: string,
): Promise<EmailAddresses | undefined> => {

  const connector = await getContactApiConnector();

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

const createPersonalEmail = async (
  colleagueUUID: string, 
  emailAddress: string, 
) => {

  const connector = await getContactApiConnector();

  const { data: result } = await connector.createEmailAddress({
    params: { userId: `${USER_UID_PREFIX}:${colleagueUUID}` },
    traceId: uuidv4(),
    body: {
      alias: PERSONAL_ALIAS,
      emailAddress
    },
  });

  return result;
};

const updatePersonalEmail = async (colleagueUUID: string, emailAddress: string, addressIdentifier: string) => {
  const connector = await getContactApiConnector();

  const { data: result } = await connector.updateEmailAddress({
    params: {
      addressIdentifier,
      userId: `${USER_UID_PREFIX}:${colleagueUUID}`,
    },
    traceId: uuidv4(),
    body: {
      alias: PERSONAL_ALIAS,
      emailAddress
    },
  });

  return result;
};

const sendEmails = async (recipients: Recipient[], data: EmailData) => {
  if (!process.env.MAILING_TEMPLATE_ID) {
    throw new Error("Can't execute without template id");
  }

  const connector = await getContactApiConnector();
  const traceId = uuidv4();

  const result = await connector.sendMessages({
    params: {
      templateId: process.env.MAILING_TEMPLATE_ID,
    },
    traceId,
    body: {
      recipients: recipients.map(r => ({ 
        address: r.address, 
        destination: r.destination})) as ApiMsgBody['recipients'],
      data,
    },
  });

  return { 
    ...result.data, 
    accepted: result.data.accepted || result.status === 202, 
    traceId 
  };
};

export type { EmailAddressesFilter, EmailAddresses, Recipient, EmailData };

export { fetchPersonalEmail, createPersonalEmail, updatePersonalEmail, sendEmails };
