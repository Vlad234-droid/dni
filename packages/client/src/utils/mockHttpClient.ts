import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Endpoint } from 'config/endpoints';
import {
  buildEventCRUD,
  buildNetworkCRUD,
  buildPostCRUD,
} from '@dni/mock-server/src/crud';

let mock = {} as MockAdapter;

if (process.env.NODE_ENV === 'test') {
  const COLLECTION_SIZE = 9;
  mock = new MockAdapter(axios);

  const mathId = (url: string, exp: RegExp) => {
    const res = url.match(exp);
    if (res!.length == 2) {
      return res![1];
    }

    return 0;
  };
  // user
  mock.onPost(Endpoint.SIGN_IN).reply(200, {});
  mock.onPost(Endpoint.SIGN_OUT).reply(200, {});
  mock.onGet(Endpoint.USER_PROFILE).reply(200, {
    params: {
      employeeNumber: 'UK00000427',
    },
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
  mock
    .onGet(oneNetwork)
    .reply((config) => [
      200,
      networkCRUD.findBy(mathId(config.url!, oneNetwork)),
    ]);
  // events
  const eventCRUD = buildEventCRUD(COLLECTION_SIZE);
  const oneEvent = new RegExp(`${Endpoint.EVENTS}/(\\d+)`);
  mock.onGet(Endpoint.EVENTS).reply(200, eventCRUD.findAll());
  mock.onGet(Endpoint.EVENTS_COUNT).reply(200, eventCRUD.count());
  mock
    .onGet(oneEvent)
    .reply((config) => [200, eventCRUD.findBy(mathId(config.url!, oneEvent))]);
  // posts
  const postsCRUD = buildPostCRUD(COLLECTION_SIZE);
  const onePost = new RegExp(`${Endpoint.POSTS}/(\\d+)`);
  mock.onGet(Endpoint.POSTS).reply(200, postsCRUD.findAll());
  mock.onGet(Endpoint.POSTS_COUNT).reply(200, postsCRUD.count());
  mock
    .onGet(onePost)
    .reply((config) => [200, postsCRUD.findBy(mathId(config.url!, onePost))]);
}

export { mock };