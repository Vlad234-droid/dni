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
    fetchAll: <T>() => httpClient.get<T>('/networks'),
    fetchOne: <T>(id: number) => httpClient.get<T>(`/networks/${id}`),
    one: <T>(data: Config) => httpClient.post<T>(`/networks`, data),
  },
});
