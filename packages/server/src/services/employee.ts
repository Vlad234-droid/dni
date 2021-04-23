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

  const employeeNumber = userInfo?.params?.employeeNumber;

  if (employeeNumber) {
    networks = (await findNetworksBy(employeeNumber)).map((ne) => ne.networkId);
    events = (await findEventsBy(employeeNumber)).map((ee) => ee.eventId);
  }

  return {
    ...userInfo,
    // TODO: add role based on some params
    role: 'employee',
    networks,
    events,
  };
};

const findNetworksBy = async (employeeNumber: string) => {
  return await getRepository(EmployeeNetwork).find({
    where: { employeeNumber },
  });
};

const createNetworkRelation = async (
  employeeNumber: string,
  networkId: number,
) => {
  await getRepository(EmployeeNetwork).save({
    employeeNumber,
    networkId,
  });
};

const removeNetworkRelation = async (
  employeeNumber: string,
  networkId: number,
) => {
  await getRepository(EmployeeNetwork).remove({
    employeeNumber,
    networkId,
  });
};

const findEventsBy = async (employeeNumber: string) => {
  return await getRepository(EmployeeEvent).find({
    where: { employeeNumber },
  });
};

const createEventRelation = async (employeeNumber: string, eventId: number) => {
  await getRepository(EmployeeEvent).save({
    employeeNumber,
    eventId,
  });
};

const removeEventRelation = async (employeeNumber: string, eventId: number) => {
  await getRepository(EmployeeEvent).remove({
    employeeNumber,
    eventId,
  });
};

export {
  profileInfoExtractor,
  findNetworksBy,
  createNetworkRelation,
  removeNetworkRelation,
  findEventsBy,
  createEventRelation,
  removeEventRelation,
};
