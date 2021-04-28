import { Response } from 'express';
import { getOpenIdUserInfo } from '@energon/onelogin';
import { getRepository, EmployeeEvent, EmployeeNetwork } from '@dni/database';

const profileInfoExtractor = async (res: Response) => {
  const userInfo = getOpenIdUserInfo(res);

  if (!userInfo) {
    return res.status(403);
  }

  let networks: number[] = [];
  let events: number[] = [];

  const tpxId = userInfo?.params?.employeeNumber;

  if (tpxId) {
    networks = (await findNetworksBy(tpxId)).map((ne) => ne.networkId);
    events = (await findEventsBy(tpxId)).map((ee) => ee.eventId);
  }

  return {
    ...userInfo,
    // TODO: add role based on some params
    role: 'employee',
    networks,
    events,
  };
};

const findNetworksBy = async (tpxId: string) => {
  return await getRepository(EmployeeNetwork).find({
    where: { tpxId },
  });
};

const createNetworkRelation = async (tpxId: string, networkId: number) => {
  await getRepository(EmployeeNetwork).save({
    tpxId,
    networkId,
  });
};

const removeNetworkRelation = async (tpxId: string, networkId: number) => {
  await getRepository(EmployeeNetwork).remove({
    tpxId,
    networkId,
  });
};

const findEventsBy = async (tpxId: string) => {
  return await getRepository(EmployeeEvent).find({
    where: { tpxId },
  });
};

const createEventRelation = async (tpxId: string, eventId: number) => {
  await getRepository(EmployeeEvent).save({
    tpxId,
    eventId,
  });
};

const removeEventRelation = async (tpxId: string, eventId: number) => {
  await getRepository(EmployeeEvent).remove({
    tpxId,
    eventId,
  });
};

const findNetworksParticipants = async () => {
  return await getRepository(EmployeeNetwork)
    .createQueryBuilder('en')
    .select('en.networkId', 'id')
    .addSelect('COUNT(en.networkId)', 'participants')
    .groupBy('en.networkId')
    .getRawMany();
};

const findEventsParticipants = async () => {
  return await getRepository(EmployeeEvent)
    .createQueryBuilder('ee')
    .select('ee.eventId', 'id')
    .addSelect('COUNT(ee.eventId)', 'participants')
    .groupBy('ee.eventId')
    .getRawMany();
};

export {
  profileInfoExtractor,
  findNetworksBy,
  createNetworkRelation,
  removeNetworkRelation,
  findEventsBy,
  createEventRelation,
  removeEventRelation,
  findNetworksParticipants,
  findEventsParticipants,
};
