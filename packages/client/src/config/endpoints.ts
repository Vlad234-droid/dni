import { AxiosInstance } from 'axios';

type Config = {
  [key: string]: string | number | undefined;
};

export default (httpClient: AxiosInstance) => ({
  auth: {
    signIn: <T>(data?: Config) => httpClient.post<T>('/auth/login', data),
    signOut: <T>() => httpClient.post<T>('/auth/logout'),
  },
  networks: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>('/networks', { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`/networks/${id}`),
    create: <T>(data: T) => httpClient.post<T>(`/networks`, data),
  },
  events: {
    fetchAll: <T>(data: Config = {}) =>
      httpClient.get<T>('/events', { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`/events/${id}`),
    create: <T>(data: T) => httpClient.post<T>(`/events`, data),
  },
  common: {
    upload: <T>(data: FormData) => httpClient.post<T>(`/upload`, data),
  },
});
