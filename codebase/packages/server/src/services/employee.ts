import { Request, Response } from 'express';
import { getColleagueUuid, getUserData } from '@dni-connectors/onelogin';
import { Colleague } from '@dni-connectors/colleague-api';

import {
  getRepository,
  DniEntityTypeEnum,
  DniUser,
  DniUserExtras,
  DniUserSubscription,
  CcmsEntity,
} from '@dni/database';

import { getConfig } from '../config/config-accessor';
import { DniProfile } from '../config/auth-data';
import { ApiError } from '../utils/api-error';


type EmailNotificationSettings = {
  receivePostsEmailNotifications: boolean;
  receiveEventsEmailNotifications: boolean;
};

type TokenSettings = {
  token: string;
  expires: string;
  payload: EmailAddresses;
};

type EmailAddresses = {
  alias: string;
  emailAddress: string;
  addressIdentifier: string;
};

type ShareStory = {
  networkTitle: string;
  storyTitle: string;
  story: string;
  name: string;
  location: string;
};

const profileInfoExtractor = async (req: Request, res: Response) => {
  const applicationUserData = getUserData<DniProfile>(res);
  const colleagueUUID = getColleagueUuid(res);

  // const { defaultRoles } = getConfig();
  // const userRoles: Set<string> = new Set(defaultRoles());

  // if (openIdUserInfo) {
  //   const userGroups = (
  //     Array.isArray(openIdUserInfo.groups)
  //       ? openIdUserInfo.groups
  //       : ((openIdUserInfo.groups as unknown as string) || '').split(',') || []
  //   )
  //     .filter(Boolean)
  //     .filter((group: string) => oidcGroupFiltersRegex().some((rr) => rr.test(group)));

  //   if (oidcManagerGroups().some((g) => userGroups.includes(g))) {
  //     userRoles.add('Manager');
  //   }
  //   if (oidcAdminGroups().some((g) => userGroups.includes(g))) {
  //     userRoles.add('Admin');
  //   }
  // }

  const networks: number[] = await findSubscriptionEntityIdsBy(colleagueUUID!, DniEntityTypeEnum.NETWORK);
  const events: number[] = await findSubscriptionEntityIdsBy(colleagueUUID!, DniEntityTypeEnum.EVENT);

  return {
    ...applicationUserData,
    colleagueUUID,
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
  const network = await getRepository(CcmsEntity).findOne({
    entityId: networkId,
    entityType: DniEntityTypeEnum.NETWORK,
  });
  if (network === undefined) {
    throw new ApiError(400, `network:${networkId} is invalid`);
  }

  await createSubscriptionEntity(colleagueUUID, networkId, DniEntityTypeEnum.NETWORK);
};

const removeNetworkRelation = async (colleagueUUID: string, networkId: number) => {
  await removeSubscriptionEntity(colleagueUUID, networkId, DniEntityTypeEnum.NETWORK);
};

const createEventRelation = async (colleagueUUID: string, eventId: number) => {
  const event = await getRepository(CcmsEntity).findOne({ entityId: eventId, entityType: DniEntityTypeEnum.EVENT });
  if (event === undefined) {
    throw new ApiError(400, `eventId:${eventId} is invalid`);
  }

  const { maxParticipants } = event!.entityInstance! as { maxParticipants?: number };

  const currentParticipants = await getRepository(DniUserSubscription)
    .createQueryBuilder()
    .where({ subscriptionEntityId: eventId, subscriptionEntityType: DniEntityTypeEnum.EVENT })
    .getCount();

  if (maxParticipants !== undefined && !Number.isNaN(maxParticipants) && currentParticipants >= maxParticipants) {
    throw new ApiError(400, `participants limit exceeded for eventId:${eventId}.`);
  }
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

  // console.log(JSON.stringify(dniUser));
  // console.log(JSON.stringify(dniUser?.extras));

  if (!dniUser.extras) {
    dniUser.initExtras();
  }

  // console.log(JSON.stringify(settings));

  dniUser.extras!.settings = { ...dniUser.extras!.settings, ...settings };

  // console.log(JSON.stringify(dniUser));

  repository.save(dniUser);

  return { colleagueUUID, settings };
};

const findSettings = async (colleagueUUID: string) => {
  const repository = getRepository(DniUserExtras);
  const dniUserExtras = await repository.findOne({ colleagueUUID });

  // console.log(JSON.stringify(dniUserExtras));
  // console.log(JSON.stringify(dniUserExtras?.settings));

  const settings = dniUserExtras?.settings || {};
  // console.log(JSON.stringify(settings));

  return dniUserExtras || { colleagueUUID };
};

const storeTokenSettings = async (colleagueUUID: string, settings: TokenSettings) => {
  const repository = getRepository(DniUser);
  const dniUser = await repository.findOneOrFail({ colleagueUUID });

  if (!dniUser.extras) {
    dniUser.initExtras();
  }

  dniUser.extras!.metadata = { ...dniUser.extras!.metadata, ...settings };

  repository.save(dniUser);

  return { colleagueUUID, ...settings };
};

const findTokenSettingsAndInvalidate = async (colleagueUUID: string, token: string) => {
  const repository = getRepository(DniUserExtras);
  const dniUserExtras = await repository.findOne({ colleagueUUID });

  const settings: TokenSettings = (dniUserExtras?.metadata as TokenSettings) || {};

  if (token !== settings?.token) {
    throw new ApiError(400, `Token is not valid`);
  } else if (settings?.expires && new Date(settings.expires).getTime() < Date.now()) {
    throw new ApiError(400, `Token has expired`);
  }

  dniUserExtras!.metadata = null;
  await repository.save([dniUserExtras!]);

  return { colleagueUUID, ...settings };
};

export type { EmailNotificationSettings, ShareStory };

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
  storeSettings,
  findSettings,
  storeTokenSettings,
  findTokenSettingsAndInvalidate,
};
