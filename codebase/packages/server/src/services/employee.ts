import { Request, Response } from 'express';
import { getOpenIdUserInfo } from '@energon/onelogin';
import { getManager, getRepository, DniUserSubscription, DniEntityTypeEnum, DniUser } from '@dni/database';
import { colleagueApiConnector, ColleagueV2 } from '@dni-connectors/colleague-api';
import { defaultConfig } from '../config/default';
import { getInstance as getCacheInstance } from './cache';
import { prepareContext } from './context';

const colleagueExtractor = async (req: Request, res: Response): Promise<ColleagueV2 | null> => {
  if (req.colleague) {
    return req.colleague!;
  }

  const userInfo = infoExtractor(req, res);

  const tpxId = userInfo?.params?.employeeNumber;
  const cache = getCacheInstance();

  if (tpxId) {
    if (cache.has(tpxId)) {
      return cache.get(tpxId)!;
    } else {
      const ctx = await prepareContext(req, res);
      const connector = colleagueApiConnector(ctx);
      const colleagues = await connector.v2.getColleagues({ params: { 'externalSystems.iam.id': tpxId } });
      const colleague = colleagues.data.length > 0 ? colleagues.data[0] : null;
      cache.set(tpxId, colleague, process.env.CACHE_COLLEAGUE_TTL || 3600);

      await createOrUpdateDniUser(colleague!);

      return colleague;
    }
  }

  return null;
};

const infoExtractor = (req: Request, res: Response) => {
  const userInfo = getOpenIdUserInfo(res) || req.cookies[process.env.COOKIE_USER_KEY!] || {};

  if (!userInfo) {
    return res.status(403);
  }

  return userInfo;
};

const profileInfoExtractor = async (req: Request, res: Response) => {
  const employee = await colleagueExtractor(req, res);
  const userInfo = infoExtractor(req, res);

  let networks: number[] = [];
  let events: number[] = [];

  const colleagueUUID = employee?.colleagueUUID;

  if (colleagueUUID) {
    networks = await findSubscriptionEntityIdsBy(colleagueUUID, DniEntityTypeEnum.NETWORK);
    events = await findSubscriptionEntityIdsBy(colleagueUUID, DniEntityTypeEnum.EVENT);
  }

  return {
    ...employee,
    userInfo,
    roles: [...(userInfo.roles || []), defaultConfig.defaultRole],
    networks,
    events,
  };
};

const findSubscriptionEntityIdsBy = async (colleagueUuid: string, subscriptionEntityType: DniEntityTypeEnum) => {
  return (
    (
      await getRepository(DniUserSubscription)
        .createQueryBuilder('us')
        .select(['ARRAY_AGG(us.subscriptionEntityId) AS ids'])
        .where({ colleagueUuid, subscriptionEntityType })
        .groupBy('us.subscriptionEntityType')
        .getRawOne()
    )?.ids || []
  );
};

const createOrUpdateDniUser = async (colleague: ColleagueV2) => {
  const dniUser = new DniUser();
  dniUser.colleagueUuid = colleague.colleagueUUID;
  dniUser.employeeNumber = colleague.externalSystems.iam.id;
  dniUser.capiProperties = {
    addressPostcode: colleague.contact?.addresses[0]?.postcode,
    hireDate: colleague.serviceDates?.hireDate,
    leaveDate: colleague.serviceDates?.leavingDate,
    businessType: colleague.workRelationships[0]?.department?.businessType,
  };
  dniUser.lastLoginAt = new Date();

  await getManager()
    .connection.createQueryBuilder()
    .insert()
    .into(DniUser)
    .values(dniUser)
    .orUpdate({
      conflict_target: ['colleague_uuid'],
      overwrite: ['employee_number', 'capi_properties', 'last_login_at'],
    })
    .execute();
};

const createSubscriptionEntity = async (
  colleagueUuid: string,
  subscriptionEntityId: number,
  subscriptionEntityType: DniEntityTypeEnum,
) => {
  await getRepository(DniUserSubscription).save({
    colleagueUuid,
    subscriptionEntityId,
    subscriptionEntityType,
  });
};

const removeSubscriptionEntity = async (
  colleagueUuid: string,
  subscriptionEntityId: number,
  subscriptionEntityType: DniEntityTypeEnum,
) => {
  await getRepository(DniUserSubscription).remove({
    colleagueUuid,
    subscriptionEntityId,
    subscriptionEntityType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};

const createNetworkRelation = async (colleagueUuid: string, networkId: number) => {
  await createSubscriptionEntity(colleagueUuid, networkId, DniEntityTypeEnum.NETWORK);
};

const removeNetworkRelation = async (colleagueUuid: string, networkId: number) => {
  await removeSubscriptionEntity(colleagueUuid, networkId, DniEntityTypeEnum.NETWORK);
};

const createEventRelation = async (colleagueUuid: string, eventId: number) => {
  await createSubscriptionEntity(colleagueUuid, eventId, DniEntityTypeEnum.EVENT);
};

const removeEventRelation = async (colleagueUuid: string, eventId: number) => {
  await removeSubscriptionEntity(colleagueUuid, eventId, DniEntityTypeEnum.EVENT);
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
  colleagueExtractor,
};
