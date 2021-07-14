import { parentPort, workerData } from 'worker_threads';
import { Request, Response } from 'express';
import { fetchPersonalEmail, sendEmails, Recipient, EmailData } from '../services/contact';
import { partition } from '../utils/array';

type Data = {
  list: string[];
  payload: EmailData;
};

const SEND_CHUNKS = process.env.MAILING_CHUNK_SIZE || 30;

const mailing = async () => {
  const recipients: Recipient[] = [];
  const req = {} as Request;
  const res = {} as Response;

  const { list: colleagueUUIDs, payload: data } = workerData as Data;

  for (const colleagueUUID of colleagueUUIDs) {
    const email = await fetchPersonalEmail(colleagueUUID, req, res);

    if (email?.emailAddress) {
      parentPort?.postMessage(`Send email to ${email?.emailAddress}`);
      addRecipient(recipients, email?.emailAddress);
    }
  }

  if (recipients.length > 0) {
    const chunks = partition(recipients, Math.ceil(recipients.length / +SEND_CHUNKS));
    for (const chunk of chunks) {
      await sendEmails(chunk, data, req, res);
    }
  }
  process.exit(0);
};

const addRecipient = (recipients: Recipient[], email: string) => {
  recipients.push({
    destination: 'emailTo',
    address: email,
  });
};

const executeSafe = async (action: () => void) => {
  try {
    return action();
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
};

executeSafe(mailing);
