import { ArgumentConfig, parse } from 'ts-command-line-args';

import { getManager } from 'typeorm';
import { DniEntityTypeEnum, CcmsEntity } from '../entities';

import {
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
  ColleagueCmsApiContext,
} from '@dni-connectors/colleague-cms-api';

// import { getConfig } from '../config/config-accessor';
// import { clientContext } from '../context';
import { processEntity } from './ccms-entity-processor';

// import { disposeIdentityClientScopeToken } from '../services';
import { createTypeOrmConnection } from '../utils';
import { colleagueCmsContext } from '../ccms/context';

interface ICcmsSyncArgs {
  mode: string;
  loggingLevel: string;
  help?: boolean;
}

const ccmsSyncArgsDescriptor: ArgumentConfig<ICcmsSyncArgs> = {
  mode: {
    type: String,
    alias: 'm',
    defaultOption: true,
    defaultValue: 'gui',
    description: 'Utility mode. Available options: plain, gui. gui is default',
  },
  loggingLevel: {
    type: String,
    defaultValue: 'info',
    description: 'Logging level in plain mode',
  },
  help: {
    type: Boolean,
    optional: true,
    alias: 'h',
    description: 'Prints this usage guide',
  },
};

const ccmsSync = async (args: ICcmsSyncArgs) => {
  await createTypeOrmConnection({ logging: false });

  // init context
  const ctx: ColleagueCmsApiContext = await colleagueCmsContext();
  console.log(`API Context acquired.`);

  const repository = getManager().getRepository(CcmsEntity);

  try {
    // Sync order is important

    // NETWORKS
    // console.log(`Processing networks ...`);
    const networksConnector = cmsNetworksApiConnector(ctx);
    await processEntity(
      repository,
      DniEntityTypeEnum.NETWORK,
      (query) => networksConnector.getNetworksCount(query),
      (query) => networksConnector.getNetworks(query),
    );

    // EVENTS
    // console.log(`Processing events ...`);
    const eventsConnector = cmsEventsApiConnector(ctx);
    await processEntity(
      repository,
      DniEntityTypeEnum.EVENT,
      (query) => eventsConnector.getEventsCount(query),
      (query) => eventsConnector.getEvents(query),
    );

    // POST
    // console.log(`Processing posts ...`);
    const postsConnector = cmsPostsApiConnector(ctx);
    await processEntity(
      repository,
      DniEntityTypeEnum.POST,
      (query) => postsConnector.getPostsCount(query),
      (query) => postsConnector.getPosts(query),
    );
  } finally {
    //disposeIdentityClientScopeToken();
  }
};

const executeSafe = async <T>(args: T, action: (a: T) => Promise<void>) => {
  try {
    return await action(args);
  } catch (e) {
    console.log(e);
  }
};

const args = parse<ICcmsSyncArgs>(ccmsSyncArgsDescriptor, { helpArg: 'help' });

executeSafe(args, ccmsSync);
