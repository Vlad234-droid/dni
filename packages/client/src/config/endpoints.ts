import { AxiosInstance } from 'axios';

type Config = {
  [key: string]: string;
};

export default (httpClient: AxiosInstance) => ({
  auth: {
    signIn: <T>(data?: Config) => httpClient.post<T>('/auth/login', data),
    signOut: <T>() => httpClient.post<T>('/auth/logout'),
  },
  networks: {
    list: <T>() => httpClient.get<T>('/networks'),
    one: <T>(id: number) => httpClient.get<T>(`/networks/${id}`),
  },
});
