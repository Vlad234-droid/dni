import axios, { AxiosRequestConfig } from 'axios';

import { API_VERSION, API_URL } from 'config/api';

const httpClient = axios.create({ baseURL: `${API_URL}/${API_VERSION}` });

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

    return Promise.reject({
      data,
      message,
      status,
    });
  },
);

export default httpClient;
