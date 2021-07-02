import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Endpoint } from 'config/endpoints';
import { buildEventCRUD, buildNetworkCRUD, buildPostCRUD } from '@dni/mock-server/src/crud';

import { getMathId } from 'utils/testUtils';

let mock = {} as MockAdapter;

if (process.env.NODE_ENV === 'test') {
  const COLLECTION_SIZE = 9;
  mock = new MockAdapter(axios);

  // user
  mock.onPost(Endpoint.SIGN_IN).reply(200, {});
  mock.onPost(Endpoint.SIGN_OUT).reply(200, {});
  mock.onGet(Endpoint.USER_PROFILE).reply(200, {
    networks: [],
    events: [],
    role: 'user',
  });
  mock.onGet(Endpoint.USER_NETWORKS).reply(200, []);
  mock.onPost(Endpoint.USER_NETWORKS).reply(200, {
    body: {},
  });
  mock.onDelete(Endpoint.USER_NETWORKS).reply(200, {
    body: {},
  });
  mock.onGet(Endpoint.USER_EVENTS).reply(200, []);
  mock.onPost(Endpoint.USER_EVENTS).reply(200, {
    body: {},
  });
  mock.onDelete(Endpoint.USER_EVENTS).reply(200, {
    body: {},
  });
  // networks
  const networkCRUD = buildNetworkCRUD(COLLECTION_SIZE);
  const oneNetwork = new RegExp(`${Endpoint.NETWORKS}/(\\d+)`);
  mock.onGet(Endpoint.NETWORKS).reply(200, networkCRUD.findAll());
  mock.onGet(Endpoint.NETWORKS_COUNT).reply(200, networkCRUD.count());
  mock.onGet(Endpoint.NETWORKS_PARTICIPANTS).reply(200, {});
  mock.onGet(oneNetwork).reply((config) => [200, networkCRUD.findBy(getMathId(config.url!, oneNetwork))]);
  // events
  const eventCRUD = buildEventCRUD(COLLECTION_SIZE);
  const oneEvent = new RegExp(`${Endpoint.EVENTS}/(\\d+)`);
  mock.onGet(Endpoint.EVENTS).reply(200, eventCRUD.findAll());
  mock.onGet(Endpoint.EVENTS_COUNT).reply(200, eventCRUD.count());
  mock.onGet(Endpoint.EVENTS_PARTICIPANTS).reply(200, {});
  mock.onGet(oneEvent).reply((config) => [200, eventCRUD.findBy(getMathId(config.url!, oneEvent))]);
  // posts
  const postsCRUD = buildPostCRUD(COLLECTION_SIZE);
  const onePost = new RegExp(`${Endpoint.POSTS}/(\\d+)`);
  mock.onGet(Endpoint.POSTS).reply(200, postsCRUD.findAll());
  mock.onGet(Endpoint.POSTS_COUNT).reply(200, postsCRUD.count());
  mock.onGet(onePost).reply((config) => [200, postsCRUD.findBy(getMathId(config.url!, onePost))]);
}

export { mock };
