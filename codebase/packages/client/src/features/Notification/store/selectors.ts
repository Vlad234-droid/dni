import { isUndefined } from 'lodash';
import { RootState } from 'store/rootReducer';
import { AcknowledgePayload } from '../config/types';

const networkNotificationsSelector = (state: RootState) => state.notifications.networkNotifications.list;

const networkNotificationIdsSelector = (state: RootState): number[] =>
  state.notifications.networkNotifications.list
    .filter((nn) => !isUndefined(nn.rootAncestorId))
    .reduce((acc, nn) => [...acc, nn.rootAncestorId!], [] as number[]);

const networkNotificationMetadataSelector = (state: RootState) => state.notifications.networkNotifications.metadata;

const notificationsSelector = (state: RootState) => state.notifications.notifications.list;

const notificationsMetadataSelector = (state: RootState) => state.notifications.notifications.metadata;

const notificationSelector = (state: RootState, selector: AcknowledgePayload) =>
  state.notifications.notifications.list.find(
    (n) => n.entityId == selector.entityId && n.entityType == selector.entityType,
  );

const isSidebarOpenedSelector = (state: RootState) => state.notifications.isSidebarOpened;

const personalEmailSelector = (state: RootState) => state.notifications.personalEmail;

export {
  networkNotificationsSelector,
  networkNotificationIdsSelector,
  networkNotificationMetadataSelector,
  notificationsSelector,
  notificationsMetadataSelector,
  notificationSelector,
  isSidebarOpenedSelector,
  personalEmailSelector,
};
