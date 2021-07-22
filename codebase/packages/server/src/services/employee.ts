import { Request, Response } from 'express';
import { getUserData, getColleagueUuid } from '@dni-connectors/onelogin';
import { Colleague } from '@dni-connectors/colleague-api';

import { getRepository, DniEntityTypeEnum, DniUser, DniUserExtras, DniUserSubscription } from '@dni/database';

import colleagueApiRawData from './data/colleague_api_data.json';
import { DniProfile } from 'config/auth-data';

type EmailNotificationSettings = {
  receivePostsEmailNotifications: boolean;
  receiveEventsEmailNotifications: boolean;
};

const profileInfoExtractor = async (req: Request, res: Response) => {
  const userInfo = getUserData<DniProfile>(res);
  const colleagueUUID = getColleagueUuid(res);

  const networks: number[] = await findSubscriptionEntityIdsBy(colleagueUUID!, DniEntityTypeEnum.NETWORK);
  const events: number[] = await findSubscriptionEntityIdsBy(colleagueUUID!, DniEntityTypeEnum.EVENT);

  return {
    colleagueUUID,
    //userInfo,
    roles: userInfo?.roles || [],
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

const findDniUser = async (colleagueUUID: string) => {
  return await getRepository(DniUser).findOne({ where: { colleagueUUID } });
};

export type ColleagueType = Pick<Colleague, 'colleagueUUID' | 'externalSystems'> &
  Partial<Pick<Colleague, 'contact' | 'serviceDates' | 'workRelationships'>>;

const createOrUpdateDniUser = async (colleague: ColleagueType) => {
  const repository = getRepository(DniUser);
  const dniUser = (await repository.preload({ colleagueUUID: colleague.colleagueUUID })) || new DniUser();

  dniUser.colleagueUUID = colleague.colleagueUUID;
  dniUser.employeeNumber = colleague.externalSystems?.iam!.id;

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
  findDniUser,
  createOrUpdateDniUser,
  profileInfoExtractor,
  findSubscriptionEntityIdsBy,
  createNetworkRelation,
  removeNetworkRelation,
  createEventRelation,
  removeEventRelation,
  findNetworksParticipants,
  findEventsParticipants,
  // infoExtractor,
  // colleagueUUIDExtractor,
  storeSettings,
  findSettings,
};
