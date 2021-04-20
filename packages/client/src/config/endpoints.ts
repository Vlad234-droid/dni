import { AxiosInstance } from 'axios';

type Config = {
  [key: string]: string | number | object | undefined;
};

export default (httpClient: AxiosInstance) => ({
  auth: {
    signIn: <T>(data?: Config) => httpClient.post<T>('/auth/login', data),
    signOut: <T>() => httpClient.post<T>('/auth/logout'),
  },
  user: {
    profile: <T>() => httpClient.get<T>('/employees/profile'),
    joinNetwork: <T>(data: Config) =>
      httpClient.post<T>('/employees/networks', data),
    leaveNetwork: <T>(data: Config) =>
      httpClient.delete<T>('/employees/networks', { data }),
    takePartEvent: <T>(data: Config) =>
      httpClient.post<T>('/employees/events', data),
    missOutEvent: <T>(data: Config) =>
      httpClient.delete<T>('/employees/events', { data }),
  },
  networks: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>('/networks', { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`/networks/${id}`),
    create: <T>(data: T) => httpClient.post<T>(`/networks`, data),
    count: <T>(data: Config = {}) =>
      httpClient.get<T>(`/networks/count`, { params: data }),
  },
  events: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>('/events', { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`/events/${id}`),
    create: <T>(data: T) => httpClient.post<T>(`/events`, data),
    count: <T>(data: Config = {}) =>
      httpClient.get<T>(`/events/count`, { params: data }),
  },
  common: {
    upload: <T>(data: FormData) => httpClient.post<T>(`/upload`, data),
  },
  posts: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>('/posts', { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`/posts/${id}`),
    create: <T>(data: T) => httpClient.post<T>(`/posts`, data),
    count: <T>(data: Config = {}) =>
      httpClient.get<T>(`/posts/count`, { params: data }),
  },
});
