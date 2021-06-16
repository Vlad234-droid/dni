import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { Page } from 'features/Page';

import './mockHttpClient';
import history from './history';

enum ResponseStatus {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

import { PUBLIC_URL, API_URL } from 'config/api';

let baseURL = '';

if (PUBLIC_URL && PUBLIC_URL !== '/') baseURL += PUBLIC_URL;
if (API_URL && API_URL !== '/') baseURL += `${API_URL}`;
if (baseURL.length === 0) baseURL = '/';

const httpClient = axios.create({ baseURL });

httpClient.defaults.paramsSerializer = (params) => qs.stringify(params);

httpClient.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  ({ data }) => data,
  (responseData = {}) => {
    const { response, message } = responseData;
    const data = response.data;
    const status = response.status;

    switch (status) {
      case ResponseStatus.UNAUTHORIZED:
        history.push(Page.UNAUTHORIZED);
        break;
      case ResponseStatus.FORBIDDEN:
        history.push(Page.FORBIDDEN);
        break;
      case ResponseStatus.SERVER_ERROR:
        history.push(Page.SERVER_ERROR);
        break;
    }

    return Promise.reject({
      data,
      message,
      status,
    });
  },
);

export default httpClient;