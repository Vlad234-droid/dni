import { AddressInfo } from 'net';
import request from 'supertest';

import { COLLEAGUE_CMS_API_URLS } from '@dni-connectors/colleague-cms-api';
import { TESCO_API_URLS } from '@energon-connectors/core';

import server from './app';
import config from './config';

const COLLEAGUE_API_LOCAL = TESCO_API_URLS.LOCAL;
const DNI_CMS_API_LOCAL = COLLEAGUE_CMS_API_URLS.LOCAL;

describe('Server run', () => {
  afterAll(async () => {
    await server.close();
  });

  it('check that server is running current port', () => {
    expect((<AddressInfo>server.address()).port).toEqual(config.port);
  });

  it('health check returns success response', (done) => {
    request(server)
      .get('/_status')
      .set('Accept', 'application/json; text/plain')
      .expect('Content-Type', /text\/plain/)
      .expect(200, done);
  });

  describe('Api routes', () => {
    it('GET post by id', (done) => {
      request(server)
        .get(`${DNI_CMS_API_LOCAL}/posts`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, done);
    });

    it('GET colleague', (done) => {
      request(server)
        .post(`${COLLEAGUE_API_LOCAL}/colleague/colleagues`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200, done);
    });
  });
});
