import { parentPort, workerData } from 'worker_threads';
import { fetchPersonalEmail, sendNewEntityEmails, Recipient, EmailData, fetchColleagueData } from '../services';
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
    const colleague = await fetchColleagueData(colleagueUUID);

    if (email?.emailAddress && !colleague?.serviceDates?.leavingDate) {
      parentPort?.postMessage(`Personal ${email?.emailAddress} address for colleague ${colleagueUUID} is found.`);
      addRecipient(recipients, email?.emailAddress, colleagueUUID);
    } else {
      parentPort?.postMessage(
        `WARNING: Personal email address for colleague ${colleagueUUID} not found or a colleague has quit`,
      );
    }
  }

  if (recipients.length > 0) {
    const chunks = partition(recipients, Math.ceil(recipients.length / +SEND_CHUNKS));
    for (const chunk of chunks) {
      const sendResult = await sendNewEntityEmails(chunk, data);
      if (sendResult.accepted) {
        parentPort?.postMessage(
          `Notification email to colleagues [${chunk
            .map((r) => r.colleagueUUID)
            .join(', ')}] accepted by contact API server. TraceId: ${sendResult.traceId}`,
        );
      } else {
        parentPort?.postMessage(
          `WARNING: Notification email to colleagues [${chunk
            .map((r) => r.colleagueUUID)
            .join(', ')}] with emails [${chunk
            .map((r) => r.address)
            .join(', ')}] was not accepted by contact API server. TraceId: ${sendResult.traceId}. Error message: ${
            sendResult.description
          }`,
        );
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
