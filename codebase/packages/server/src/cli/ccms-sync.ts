import { ArgumentConfig, parse } from 'ts-command-line-args';

import { getManager, DniEntityTypeEnum, CcmsEntity } from '@dni/database';

import {
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
  DniCmsApiContext,
} from '@dni-connectors/colleague-cms-api';

import { getConfig } from '../config/config-accessor';
import { initializeTypeOrm } from '../config/db';
import { clientContext } from '../context';
import { processEntity } from './ccms-entity-processor';
import { disposeIdentityClientScopeToken } from '../services';

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
  await initializeTypeOrm({ logging: false });

  // init context
  const ctx: DniCmsApiContext = await clientContext(getConfig());
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
    disposeIdentityClientScopeToken();
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
