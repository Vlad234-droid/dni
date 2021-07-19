import { Request, Response } from 'express';
import { getOpenIdUserInfo } from '@dni-connectors/onelogin';
import { getRepository, DniUserSubscription, DniEntityTypeEnum, DniUser, DniUserExtras } from '@dni/database';
import { colleagueApiConnector, ColleagueV2 } from '@dni-connectors/colleague-api';

import { isPROD } from '../config/env';
import { getConfig } from '../config/config-accessor';

import { getInstance as getCacheInstance } from './cache';
import { prepareContext } from './context';

import colleagueApiRawData from './data/colleague_api_data.json';

const colleagueApiData = colleagueApiRawData as unknown as ColleagueV2[];

type EmailNotificationSettings = {
  receivePostsEmailNotifications: boolean;
  receiveEventsEmailNotifications: boolean;
};

type ColleagueRequest = {
  colleagueUUID?: string | null;
} & Request;

const infoExtractor = (req: Request, res: Response) => {
  if (res.writableEnded) {
    return;
  }

  const userInfo = getOpenIdUserInfo(res) || req.cookies[getConfig().applicationUserDataCookieName()] || {};

  if (!userInfo) {
    return res.status(403).send(JSON.stringify({ error: 'Cannot extract userInfo' }));
  }

  return userInfo;
};

const colleagueUUIDExtractor = async (req: ColleagueRequest, res: Response): Promise<string | null> => {
  if (res.writableEnded) {
    return null;
  }

  if (req.colleagueUUID) {
    return req.colleagueUUID!;
  }

  const userInfo = infoExtractor(req, res);
  const employeeNumber = userInfo?.params?.employeeNumber;
  if (!employeeNumber) {
    res.status(403).json({
      error: 'Unauthorized. employeeNumber is missing.',
    });

    return null;
  }

  const cache = getCacheInstance();
  const cacheEmployeeNumber = `EMPLOYEE_${employeeNumber}`;

  if (cache.has(cacheEmployeeNumber)) {
    return cache.get(cacheEmployeeNumber)!;
  }

  // // 1. try to get colleagueUUID from DB
  // const dniUser = await findDniUser(employeeNumber);
  // if (dniUser) {
  //   cache.set(cacheEmployeeNumber, dniUser.colleagueUUID, getConfig().cacheColleagueTtl());
  //   return dniUser.colleagueUUID;
  // }

  // 2. try to get colleagueUUID from Colleague API
  const ctx = await prepareContext(req, res);
  const connector = colleagueApiConnector(ctx);
  const colleagues = await connector.v2.getColleagues({ params: { 'externalSystems.iam.id': employeeNumber } });
  if (colleagues.data.length > 0) {
    const colleague = colleagues.data[0];
    await createOrUpdateDniUser(colleague!);

    cache.set(cacheEmployeeNumber, colleague.colleagueUUID, getConfig().cacheColleagueTtl());
    return colleague.colleagueUUID;
  }

  if (!isPROD(getConfig().environment())) {
    // 3. and finally fallback to local file with predefine users
    const colleague = colleagueApiData.find((c) => c.externalSystems.iam.id === employeeNumber);
    console.log(JSON.stringify(colleague));
    if (colleague) {
      console.log(
        `WARNING! Please be advised colleague data for employee ${employeeNumber} acquired from local cache file`,
      );
      await createOrUpdateDniUser(colleague);

      cache.set(cacheEmployeeNumber, colleague.colleagueUUID, getConfig().cacheColleagueTtl());
      return colleague.colleagueUUID;
    }
  }

  res.status(403).json({
    error: `Unauthorized. colleagueUUID is missing for the employee: ${employeeNumber}`,
  });

  return null;
};

const profileInfoExtractor = async (req: Request, res: Response) => {
  if (res.writableEnded) {
    return;
  }

  const userInfo = infoExtractor(req, res);

  const colleagueUUID = await colleagueUUIDExtractor(req, res);
  if (!colleagueUUID) {
    const employeeNumber = userInfo?.params?.employeeNumber;
    console.log(`Colleague data for employee ${employeeNumber} is not found.`);
    res.status(403).send(JSON.stringify({ error: `Colleague data for employee ${employeeNumber} is not found.` }));
    return;
  }

  const networks: number[] = await findSubscriptionEntityIdsBy(colleagueUUID, DniEntityTypeEnum.NETWORK);
  const events: number[] = await findSubscriptionEntityIdsBy(colleagueUUID, DniEntityTypeEnum.EVENT);

  return {
    colleagueUUID,
    userInfo,
    roles: [...(userInfo.roles || []), ...getConfig().defaultRoles()],
    networks,
    events,
  };
};

const findSubscriptionEntityIdsBy = async (colleagueUUID: string, subscriptionEntityType: DniEntityTypeEnum) => {
  return (
    (
      await getRepository(DniUserSubscription)
        .createQueryBuilder('us')
        .select(['ARRAY_AGG(us.subscriptionEntityId) AS ids'])
        .where({ colleagueUUID, subscriptionEntityType })
        .groupBy('us.subscriptionEntityType')
        .getRawOne()
    )?.ids || []
  );
};

// const findDniUser = async (employeeNumber: string) => {
//   return await getRepository(DniUser).findOne({ where: { employeeNumber } });
// };

const createOrUpdateDniUser = async (colleague: ColleagueV2) => {
  const repository = getRepository(DniUser);
  const dniUser = (await repository.preload({ colleagueUUID: colleague.colleagueUUID })) || new DniUser();

  console.log(JSON.stringify(dniUser));

  dniUser.colleagueUUID = colleague.colleagueUUID;
  dniUser.employeeNumber = colleague.externalSystems.iam.id;

  await repository.save(dniUser);

  const dniUserExtras = dniUser.extras || dniUser.initExtras();

  dniUserExtras.lastLoginAt = new Date();
  dniUserExtras.colleagueProperties = {
    addressPostcode: colleague.contact?.addresses?.[0]?.postcode,
    hireDate: colleague.serviceDates?.hireDate,
    leavingDate: colleague.serviceDates?.leavingDate,
    businessType: colleague.workRelationships?.[0]?.department?.businessType,
  };

  await repository.save(dniUser);
};

const createSubscriptionEntity = async (
  colleagueUUID: string,
  subscriptionEntityId: number,
  subscriptionEntityType: DniEntityTypeEnum,
) => {
  await getRepository(DniUserSubscription).save({
    colleagueUUID,
    subscriptionEntityId,
    subscriptionEntityType,
  });
};

const removeSubscriptionEntity = async (
  colleagueUUID: string,
  subscriptionEntityId: number,
  subscriptionEntityType: DniEntityTypeEnum,
) => {
  const userSubscriptionToRemove = {
    colleagueUUID,
    subscriptionEntityId,
    subscriptionEntityType,
  } as DniUserSubscription;

  await getRepository(DniUserSubscription).remove(userSubscriptionToRemove);
};

const createNetworkRelation = async (colleagueUUID: string, networkId: number) => {
  await createSubscriptionEntity(colleagueUUID, networkId, DniEntityTypeEnum.NETWORK);
};

const removeNetworkRelation = async (colleagueUUID: string, networkId: number) => {
  await removeSubscriptionEntity(colleagueUUID, networkId, DniEntityTypeEnum.NETWORK);
};

const createEventRelation = async (colleagueUUID: string, eventId: number) => {
  await createSubscriptionEntity(colleagueUUID, eventId, DniEntityTypeEnum.EVENT);
};

const removeEventRelation = async (colleagueUUID: string, eventId: number) => {
  await removeSubscriptionEntity(colleagueUUID, eventId, DniEntityTypeEnum.EVENT);
};

const findSubscriptionEntityParticipants = async (subscriptionEntityType: DniEntityTypeEnum) => {
  return await getRepository(DniUserSubscription)
    .createQueryBuilder('us')
    .select('us.subscriptionEntityId', 'id')
    .addSelect('COUNT(us.subscriptionEntityId)', 'participants')
    .where({ subscriptionEntityType })
    .groupBy('us.subscriptionEntityId')
    .getRawMany();
};

const findNetworksParticipants = async () => {
  return await findSubscriptionEntityParticipants(DniEntityTypeEnum.NETWORK);
};

const findEventsParticipants = async () => {
  return await findSubscriptionEntityParticipants(DniEntityTypeEnum.EVENT);
};

const storeSettings = async (colleagueUUID: string, settings: EmailNotificationSettings) => {
  const repository = getRepository(DniUser);
  const dniUser = await repository.findOneOrFail({ colleagueUUID });

  console.log(JSON.stringify(dniUser));
  console.log(JSON.stringify(dniUser?.extras));

  if (!dniUser.extras) {
    dniUser.initExtras();
  }

  console.log(JSON.stringify(settings));

  dniUser.extras!.settings = { ...dniUser.extras!.settings, ...settings };

  console.log(JSON.stringify(dniUser));

  repository.save(dniUser);

  return { colleagueUUID, settings };
};

const findSettings = async (colleagueUUID: string) => {
  const repository = getRepository(DniUserExtras);
  const dniUserExtras = await repository.findOne({ colleagueUUID });

  console.log(JSON.stringify(dniUserExtras));
  console.log(JSON.stringify(dniUserExtras?.settings));

  const settings = dniUserExtras?.settings || {};
  console.log(JSON.stringify(settings));

  return dniUserExtras || { colleagueUUID };
};

export type { EmailNotificationSettings };

export {
  createOrUpdateDniUser,
  profileInfoExtractor,
  findSubscriptionEntityIdsBy,
  createNetworkRelation,
  removeNetworkRelation,
  createEventRelation,
  removeEventRelation,
  findNetworksParticipants,
  findEventsParticipants,
  infoExtractor,
  colleagueUUIDExtractor,
  storeSettings,
  findSettings,
};
