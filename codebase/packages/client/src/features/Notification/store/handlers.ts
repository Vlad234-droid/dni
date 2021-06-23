import store from 'store';
import { actions } from './slice';
import { Id, EntityType } from '../config/types';
import { entitySelector } from './selectors';
import { ToastSkin, toasterActions } from 'features/Toaster';

const onNotificationAll = (data: []) => {
  if (data.length === 0) {
    store.dispatch(actions.closeNotificationSidebar());
  }

  store.dispatch(actions.setAllNotifications({ data }));
};

const onNotificationCreate = () => {
  store.dispatch(
    toasterActions.createToast({
      skin: ToastSkin.EXAMPLE,
    }),
  );
};

const onNotificationDelete = (ids: []) => {
  console.log('delete', ids);
};

const onNotificationCloserClick = ({ id }: { id: Id }) => {
  // emit delete by ids
};

const onEntityRender = ({ id, entityType }: { id: Id; entityType: EntityType }) => {
  const selector = entitySelector[entityType];
  const entity = selector(store.getState().notification, id);

  if (!entity) {
    return;
  }

  const { ids } = entity.notifications;

  // emit delete by ids
};

export { onNotificationAll, onNotificationCreate, onNotificationDelete, onNotificationCloserClick, onEntityRender };
