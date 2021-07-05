import { initializeTypeOrm } from '../config/db';
import { prepareContext, RequestCtx } from '../services/context';
import {
  Post,
  Event,
  Network,
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
  TENANT_KEY as tenantkey,
} from '@dni-connectors/colleague-cms-api';
import { getManager, DniEntityTypeEnum, CcmsEntity, slugify } from '@dni/database';

interface CommonEntity {
  id: number;
  slug: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  network?: CommonEntity;
  event?: CommonEntity;
}

// order is important
const entityTypes = [DniEntityTypeEnum.NETWORK, DniEntityTypeEnum.EVENT, DniEntityTypeEnum.POST];

const ccmsEntitiesInit = async () => {
  await initializeTypeOrm();

  // init context
  const ctx: RequestCtx = await prepareContext();

  for (const entityType of entityTypes) {
    console.log(`Try to handle entityType: ${entityType}`);
    const entities: CommonEntity[] = await analyzeEntities(entityType, ctx);

    const preparedEntities = prepareCcmsEntities(entities, entityType);
    console.log(`With the prepared entities: ${JSON.stringify(preparedEntities)}`);
    await saveToDB(preparedEntities);
  }
};

const analyzeEntities = async (entityType: DniEntityTypeEnum, ctx: RequestCtx): Promise<CommonEntity[]> => {
  // prepare payload
  const reqPayload = {
    tenantkey,
    params: {
      _start: '0',
      _limit: '100',
    },
  };

  switch (entityType) {
    case DniEntityTypeEnum.POST: {
      const connector = cmsPostsApiConnector(ctx);
      const response = await connector.getPosts(reqPayload);
      return unsafelyUnpackResponseData<Post[], CommonEntity[]>(response);
    }
    case DniEntityTypeEnum.EVENT: {
      const connector = cmsEventsApiConnector(ctx);
      const response = await connector.getEvents(reqPayload);
      return unsafelyUnpackResponseData<Event[], CommonEntity[]>(response);
    }
    case DniEntityTypeEnum.NETWORK: {
      const connector = cmsNetworksApiConnector(ctx);
      const response = await connector.getNetworks(reqPayload);
      return unsafelyUnpackResponseData<Network[], CommonEntity[]>(response);
    }
  }
};

const unsafelyUnpackResponseData = <T, P>(response: { data: T }) => response.data as unknown as P;

const prepareCcmsEntities = (entities: CommonEntity[], entityType: DniEntityTypeEnum): CcmsEntity[] => {
  return entities.map((entity) =>
    getRepository().create({
      entityId: entity.id,
      entityType,
      slug: entity.slug || slugify(entity.title),
      entityInstance: entity,
      entityCreatedAt: entity.published_at,
      entityUpdatedAt: entity.published_at,
      entityPublishedAt: entity.published_at,
      ...prepareParentCcmsPartial(entity),
    }),
  );
};

const prepareParentCcmsPartial = (entity: CommonEntity): Pick<CcmsEntity, 'parentEntityId' | 'parentEntityType'> => {
  const parent = entity.event || entity.network;

  if (!parent) {
    return {};
  }

  return {
    parentEntityId: parent.id,
    parentEntityType: entity.event?.id
      ? DniEntityTypeEnum.EVENT
      : entity.network?.id
      ? DniEntityTypeEnum.NETWORK
      : undefined,
  };
};

const getRepository = () => {
  return getManager().getRepository(CcmsEntity);
};

const saveToDB = async (entities: CcmsEntity[]) => {
  await getRepository().save(entities);
};

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const executeSafe = async (action: () => void) => {
  try {
    return await action();
  } catch (e) {
    console.log(e);
  }
};

executeSafe(ccmsEntitiesInit);
