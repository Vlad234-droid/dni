import { getManager, DniEntityTypeEnum, CcmsEntity, slugify } from '@dni/database';

import {
  Post,
  Event,
  Network,
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
  DniCmsApiContext,
} from '@dni-connectors/colleague-cms-api';

import { getConfig, prettify } from '../config/config-accessor';
import { initializeTypeOrm } from '../config/db';
import { clientContext } from '../context';

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

  const config = getConfig();
  // show variables
  prettify(config);
  // init context
  const ctx: DniCmsApiContext = await clientContext(config);

  for (const entityType of entityTypes) {
    console.log(`Try to handle entityType: ${entityType}`);
    const entities: CommonEntity[] = await analyzeEntities(entityType, ctx);

    const preparedEntities = prepareCcmsEntities(entities, entityType);
    console.log(`With the prepared entities: ${JSON.stringify(preparedEntities)}`);
    await saveToDB(preparedEntities);

    await sleep(5000);
  }
};

const analyzeEntities = async (entityType: DniEntityTypeEnum, ctx: DniCmsApiContext): Promise<CommonEntity[]> => {
  // prepare payload
  const reqPayload = {
    params: {
      _start: '0',
      _limit: '100',
      _publicationState: 'preview',
    },
  };

  switch (entityType) {
    case DniEntityTypeEnum.NETWORK: {
      const connector = cmsNetworksApiConnector(ctx);
      const response = await connector.getNetworks(reqPayload);
      return unsafelyUnpackResponseData<Network[], CommonEntity[]>(response);
    }
    case DniEntityTypeEnum.EVENT: {
      const connector = cmsEventsApiConnector(ctx);
      const response = await connector.getEvents(reqPayload);
      return unsafelyUnpackResponseData<Event[], CommonEntity[]>(response);
    }
    case DniEntityTypeEnum.POST: {
      const connector = cmsPostsApiConnector(ctx);
      const response = await connector.getPosts(reqPayload);
      return unsafelyUnpackResponseData<Post[], CommonEntity[]>(response);
    }
    default: {
      return [];
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
      entityCreatedAt: entity.created_at || entity.published_at || new Date(),
      entityUpdatedAt: entity.updated_at || entity.published_at,
      entityPublishedAt: entity.published_at,
      ...prepareParentCcmsPartial(entity),
    }),
  );
};

const prepareParentCcmsPartial = (
  entity: CommonEntity,
): Pick<CcmsEntity, 'parentEntityId' | 'parentEntityType'> | undefined => {
  const parent = entity.event || entity.network;

  if (parent) {
    return {
      parentEntityId: parent.id,
      parentEntityType: entity.event?.id
        ? DniEntityTypeEnum.EVENT
        : entity.network?.id
        ? DniEntityTypeEnum.NETWORK
        : undefined,
    };
  } else {
    return undefined;
  }
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
    return action();
  } catch (e) {
    console.log(e);
  }
};

executeSafe(ccmsEntitiesInit);
