import { AxiosInstance } from 'axios';

type Config = {
  [key: string]: boolean | string | number | object | undefined;
};

export enum Endpoint {
  // auth
  // SIGN_IN = '/auth/login',
  // SIGN_OUT = '/auth/logout',

  // common
  // COMMON_UPLOAD = '/upload',

  // user
  USER_PROFILE = '/dni/v1/employees/profile',
  USER_SHARE_STORY = '/dni/v1/employees/share-story',
  USER_NETWORKS = '/dni/v1/employees/networks',
  USER_EVENTS = '/dni/v1/employees/events',
  USER_REACTIONS = '/tesco/cms/v1/reactions',

  // networks
  NETWORKS = '/tesco/cms/v1/networks',
  NETWORKS_COUNT = '/tesco/cms/v1/networks/count',
  NETWORKS_PARTICIPANTS = '/dni/v1/networks/participants',

  // events
  EVENTS = '/tesco/cms/v1/events',
  EVENTS_COUNT = '/tesco/cms/v1/events/count',
  EVENTS_PARTICIPANTS = '/dni/v1/events/participants',

  // posts
  POSTS = '/tesco/cms/v1/posts',
  POSTS_COUNT = '/tesco/cms/v1/posts/count',

  // reports
  REPORT_MEMBERS = '/dni/v1/reports/members',
  REPORT_REGIONS = '/dni/v1/reports/regions',
  REPORT_DEPARTMENTS = '/dni/v1/reports/departments',
  REPORT_PRINT_PDF = '/dni/v1/reports/print-pdf',

  // notifications
  NOTIFICATIONS = '/dni/v1/notifications',
  NOTIFICATIONS_NETWORKS = '/dni/v1/notifications/networks',
  NOTIFICATIONS_ACKNOWLEDGE = '/dni/v1/notifications/acknowledge',

  // contact
  CONTACT_PERSONAL_EMAIL = '/dni/v1/employees/personal-email',
  CONTACT_EMAIL_NOTIFICATIONS_SETTINGS = '/dni/v1/employees/email-notifications-settings',
}

export default (httpClient: AxiosInstance) => ({
  // auth: {
  //   signIn: <T>(data?: Config) => httpClient.post<T>(Endpoint.SIGN_IN, data),
  //   signOut: <T>() => httpClient.post<T>(Endpoint.SIGN_OUT),
  // },
  user: {
    profile: <T>() => httpClient.get<T>(Endpoint.USER_PROFILE),
    joinNetwork: <T>(data: Config) => httpClient.post<T>(Endpoint.USER_NETWORKS, data),
    leaveNetwork: <T>(data: Config) => httpClient.delete<T>(`${Endpoint.USER_NETWORKS}/${data.networkId}`),
    joinEvent: <T>(data: Config) => httpClient.post<T>(Endpoint.USER_EVENTS, data),
    leaveEvent: <T>(data: Config) => httpClient.delete<T>(`${Endpoint.USER_EVENTS}/${data.eventId}`),
    shareStory: <T>(data: Config) => httpClient.get<T>(Endpoint.USER_SHARE_STORY, data),
  },
  networks: {
    fetchAll: <T>(data: Config = {}) => httpClient.get<T>(Endpoint.NETWORKS, { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`${Endpoint.NETWORKS}/${id}`),
    create: <T>(data: T) => httpClient.post<T>(Endpoint.NETWORKS, data),
    count: <T>(data: Config = {}) => httpClient.get<T>(Endpoint.NETWORKS_COUNT, { params: data }),
    participants: <T>() => httpClient.get<T>(Endpoint.NETWORKS_PARTICIPANTS),
  },
  events: {
    fetchAll: <T>(data: Config = {}) => httpClient.get<T>(Endpoint.EVENTS, { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`${Endpoint.EVENTS}/${id}`),
    create: <T>(data: T) => httpClient.post<T>(Endpoint.EVENTS, data),
    count: <T>(data: Config = {}) => httpClient.get<T>(Endpoint.EVENTS_COUNT, { params: data }),
    participants: <T>() => httpClient.get<T>(Endpoint.EVENTS_PARTICIPANTS),
  },
  // common: {
  //   upload: <T>(data: FormData) => httpClient.post<T>(Endpoint.COMMON_UPLOAD, data),
  // },
  posts: {
    fetchAll: <T>(data: Config = {}) => httpClient.get<T>(Endpoint.POSTS, { params: data }),
    fetchOne: <T>(id: number) => httpClient.get<T>(`${Endpoint.POSTS}/${id}`),
    count: <T>(data: Config = {}) => httpClient.get<T>(Endpoint.POSTS_COUNT, { params: data }),
  },
  report: {
    members: <T>(query: Config = {}) => httpClient.get<T>(Endpoint.REPORT_MEMBERS, { params: query }),
    regions: <T>(query: Config = {}) => httpClient.get<T>(Endpoint.REPORT_REGIONS, { params: query }),
    departments: <T>(query: Config = {}) => httpClient.get<T>(Endpoint.REPORT_DEPARTMENTS, { params: query }),
    printPdf: <T>(data: T) =>
      httpClient.post<Blob>(Endpoint.REPORT_PRINT_PDF, data, {
        responseType: 'blob',
      }),
  },
  notifications: {
    fetchAll: <T>() => httpClient.get<T>(Endpoint.NOTIFICATIONS),
    fetchAllGroupByNetwork: <T>() => httpClient.get<T>(Endpoint.NOTIFICATIONS_NETWORKS),
    acknowledge: <T>(data: Config = {}) => httpClient.post<T>(Endpoint.NOTIFICATIONS_ACKNOWLEDGE, data),
  },
  contact: {
    getPersonalEmail: <T>() => httpClient.get<T>(Endpoint.CONTACT_PERSONAL_EMAIL),
    createPersonalEmail: <T>(data: Config = {}) => httpClient.post<T>(Endpoint.CONTACT_PERSONAL_EMAIL, data),
    updatePersonalEmail: <T>(uuid: string, data: Config = {}) =>
      httpClient.put<T>(`${Endpoint.CONTACT_PERSONAL_EMAIL}/${uuid}`, data),
    getNotificationsSettings: <T>() => httpClient.get<T>(Endpoint.CONTACT_EMAIL_NOTIFICATIONS_SETTINGS),
    updateNotificationsSettings: <T>(data: Config = {}) =>
      httpClient.post<T>(Endpoint.CONTACT_EMAIL_NOTIFICATIONS_SETTINGS, data),
  },
  reactions: {
    getReactions: <T>(data: Config = {}) => httpClient.get<T>(`${Endpoint.USER_REACTIONS}/external/${data.uuid}?authorField=external_id`),
    addReaction: <T>(data: Config = {}) => httpClient.post<T>(Endpoint.USER_REACTIONS, data),
    deleteReaction: <T>({ reactionId, uuid }: Config = {}) => httpClient.delete<T>(`${Endpoint.USER_REACTIONS}/external/${reactionId}?authorQuery=${uuid}&authorField=external_id`),
  }
});
