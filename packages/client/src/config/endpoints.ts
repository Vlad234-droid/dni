import { AxiosInstance } from 'axios';

type Config = {
  [key: string]: string | number | object | undefined;
};

export enum Endpoint {
  // auth
  SIGN_IN = '/auth/login',
  SIGN_OUT = '/auth/logout',
  // user
  USER_PROFILE = '/employees/profile',
  USER_NETWORKS = '/employees/networks',
  USER_EVENTS = '/employees/events',
  // networks
  NETWORKS = '/networks',
  NETWORKS_COUNT = '/networks/count',
  NETWORKS_PARTICIPANTS = '/networks/participants',
  // events
  EVENTS = '/events',
  EVENTS_COUNT = '/events/count',
  EVENTS_PARTICIPANTS = '/events/participants',
  // posts
  POSTS = '/posts',
  POSTS_COUNT = '/posts/count',
  // common
  COMMON_UPLOAD = '/upload',
}

export default (httpClient: AxiosInstance) => ({
  auth: {
    signIn: <T>(data?: Config) => httpClient.post<T>(Endpoint.SIGN_IN, data),
    signOut: <T>() => httpClient.post<T>(Endpoint.SIGN_OUT),
  },
  user: {
    profile: <T>() => httpClient.get<T>(Endpoint.USER_PROFILE),
    joinNetwork: <T>(data: Config) =>
      httpClient.post<T>(Endpoint.USER_NETWORKS, data),
    leaveNetwork: <T>(data: Config) =>
      httpClient.delete<T>(Endpoint.USER_NETWORKS, { data }),
    joinEvent: <T>(data: Config) =>
      httpClient.post<T>(Endpoint.USER_EVENTS, data),
    leaveEvent: <T>(data: Config) =>
      httpClient.delete<T>(Endpoint.USER_EVENTS, { data }),
  },
  networks: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>(Endpoint.NETWORKS, { params: data }),
    fetchOne: <T>(id: number) =>
      httpClient.get<T>(`${Endpoint.NETWORKS}/${id}`),
    create: <T>(data: T) => httpClient.post<T>(Endpoint.NETWORKS, data),
    count: <T>(data: Config = {}) =>
      httpClient.get<T>(Endpoint.NETWORKS_COUNT, { params: data }),
    participants: <T>() => httpClient.get<T>(Endpoint.NETWORKS_PARTICIPANTS),
  },
  events: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>(Endpoint.EVENTS, { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`${Endpoint.EVENTS}/${id}`),
    create: <T>(data: T) => httpClient.post<T>(Endpoint.EVENTS, data),
    count: <T>(data: Config = {}) =>
      httpClient.get<T>(Endpoint.EVENTS_COUNT, { params: data }),
    participants: <T>() => httpClient.get<T>(Endpoint.EVENTS_PARTICIPANTS),
  },
  common: {
    upload: <T>(data: FormData) =>
      httpClient.post<T>(Endpoint.COMMON_UPLOAD, data),
  },
  posts: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>(Endpoint.POSTS, { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`${Endpoint.POSTS}/${id}`),
    create: <T>(data: T) => httpClient.post<T>(Endpoint.POSTS, data),
    count: <T>(data: Config = {}) =>
      httpClient.get<T>(Endpoint.POSTS_COUNT, { params: data }),
  },
});
