import { isUndefined } from 'lodash';
import { RootState } from 'store/rootReducer';
import { AcknowledgePayload } from '../config/types';

export const grouppedNotificationsSelector = (state: RootState) => state.notifications.grouppedNotifications.list;

export const grouppedNotificationIdsSelector = (state: RootState): number[] =>
  state.notifications.grouppedNotifications.list
    .filter((nn) => !isUndefined(nn.ancestorId))
    .reduce((acc, nn) => [...acc, nn.ancestorId!], [] as number[]);

export const grouppedNotificationsMetadataSelector = (state: RootState) => state.notifications.grouppedNotifications.metadata;

export const plainNotificationsSelector = (state: RootState) => state.notifications.plainNotifications.list;

export const plainNotificationsMetadataSelector = (state: RootState) => state.notifications.plainNotifications.metadata;

export const plainNotificationSelector = (state: RootState, selector: AcknowledgePayload) =>
  state.notifications.plainNotifications.list.find(
    (n) => n.entityId == selector.entityId && n.entityType == selector.entityType,
  );

export const isSidebarOpenedSelector = (state: RootState) => state.notifications.isSidebarOpened;

export const personalEmailSelector = (state: RootState) => state.notifications.personalEmail;
