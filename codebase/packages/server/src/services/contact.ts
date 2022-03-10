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

const config = getConfig();

const getContactApiConnector = async () => {
  const ctx = await clientContext(config);
  return contactApiConnector(ctx);
};

const fetchPersonalEmail = async (colleagueUUID: string): Promise<EmailAddresses | undefined> => {
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

const createPersonalEmail = async (colleagueUUID: string, emailAddress: string) => {
  const connector = await getContactApiConnector();

  const { data: result } = await connector.createEmailAddress({
    params: { userId: `${USER_UID_PREFIX}:${colleagueUUID}` },
    traceId: uuidv4(),
    body: {
      alias: PERSONAL_ALIAS,
      emailAddress,
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
      emailAddress,
    },
  });

  return result;
};

const sendNewEntityEmails = async (recipients: Recipient[], data: EmailData) => {
  return await sendEmails(config.mailingNewEntityTemplateId(), recipients, data);
};

const sendShareStoryEmail = async (data: EmailData) => {
  return await sendEmails(
    config.mailingShareStoryTemplateId(),
    [createRecipient(config.mailingStakeholderEmail(), 'unknown')],
    data,
  );
};

const sendConfirmationEmailToNewEmail = async (colleagueUUID: string, data: EmailData) => {
  return await sendEmails(
    config.mailingConfirmationNewEmailTemplateId(),
    [createRecipient(data.newEmailAddress, colleagueUUID)],
    data,
  );
};

const sendConfirmationEmailToOldEmail = async (colleagueUUID: string, data: EmailData) => {
  return await sendEmails(
    config.mailingConfirmationOldEmailTemplateId(),
    [createRecipient(data.oldEmailAddress, colleagueUUID)],
    data,
  );
};

const sendConfirmationEmailSuccess = async (colleagueUUID: string, data: EmailData) => {
  return await sendEmails(
    config.mailingConfirmationEmailSuccessTemplateId(),
    [createRecipient(data.newEmailAddress, colleagueUUID)],
    data,
  );
};

const safeFetchEmail = async (colleagueUUID: string) => {
  const email = await fetchPersonalEmail(colleagueUUID);

  if (email?.emailAddress) {
    return email?.emailAddress;
  }

  throw Error(`Personal email address for colleague ${colleagueUUID} not found.`);
};

const createRecipient = (email: string, colleagueUUID: string) => {
  return {
    destination: 'emailTo' as Recipient['destination'],
    address: email,
    colleagueUUID,
  };
};

const sendEmails = async (templateId: string, recipients: Recipient[], data: EmailData) => {
  const connector = await getContactApiConnector();
  const traceId = uuidv4();

  const result = await connector.sendMessages({
    params: {
      templateId,
    },
    traceId,
    body: {
      recipients: recipients.map((r) => ({
        address: r.address,
        destination: r.destination,
      })) as ApiMsgBody['recipients'],
      data,
    },
  });

  const accepted = result.data.accepted || result.status === 202;

  console.log(
    `INFO: Notification email to colleagues [${recipients
      .map((r) => r.colleagueUUID)
      .join(', ')}] with emails [${recipients.map((r) => r.address).join(', ')}] was sent. Payload: ${JSON.stringify(
      data,
      null,
      2,
    )} TraceId: ${traceId}. TemplateId: ${templateId}. Accepted: ${accepted}`,
  );

  return {
    ...result.data,
    accepted,
    traceId,
  };
};

export type { EmailAddressesFilter, EmailAddresses, Recipient, EmailData };

export {
  fetchPersonalEmail,
  createPersonalEmail,
  updatePersonalEmail,
  sendNewEntityEmails,
  sendShareStoryEmail,
  sendConfirmationEmailToNewEmail,
  sendConfirmationEmailToOldEmail,
  sendConfirmationEmailSuccess,
};
