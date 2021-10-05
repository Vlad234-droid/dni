import { parentPort, workerData } from 'worker_threads';
import { fetchPersonalEmail, sendEmails, Recipient, EmailData } from '../services/contact';
import { partition } from '../utils/array';

type Data = {
  list: string[];
  payload: EmailData;
};

const SEND_CHUNKS = process.env.MAILING_CHUNK_SIZE || 1;

const mailing = async () => {
  const recipients: Recipient[] = [];

  const { list: colleagueUUIDs, payload: data } = workerData as Data;

  for (const colleagueUUID of colleagueUUIDs) {
    const email = await fetchPersonalEmail(colleagueUUID);

    if (email?.emailAddress) {
      parentPort?.postMessage(`Personal email address for colleague ${colleagueUUID} is found.`);
      addRecipient(recipients, email?.emailAddress, colleagueUUID);
    } else {
      parentPort?.postMessage(`WARNING: Personal email address for colleague ${colleagueUUID} not found.`);
    }
  }

  if (recipients.length > 0) {
    const chunks = partition(recipients, Math.ceil(recipients.length / +SEND_CHUNKS));
    for (const chunk of chunks) {
      const sendResult = await sendEmails(chunk, data);
      console.log(JSON.stringify(sendResult));
      if (sendResult.accepted) {
        parentPort?.postMessage(`Notification email to colleagues [${chunk.map(r => r.colleagueUUID).join(', ')}] accepted by contact API server. TraceId: ${sendResult.traceId}`);
      } else {
        parentPort?.postMessage(`WARNING: Notification email to colleagues [${chunk.map(r => r.colleagueUUID).join(', ')}] was not accepted by contact API server. TraceId: ${sendResult.traceId}. Error message: ${sendResult.description}`);
      }
    }
  }
  process.exit(0);
};

const addRecipient = (recipients: Recipient[], email: string, colleagueUUID: string) => {
  recipients.push({
    destination: 'emailTo',
    address: email,
    colleagueUUID,
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
