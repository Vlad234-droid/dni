import store from 'store';
import { actions } from './slice';
import { Id, EmitType, EntityType } from '../config/types';
import { entitySelector } from './selectors';
import { ToastSkin, toasterActions } from 'features/Toaster';

import { socket } from 'config/notification';

const onSocketConnect = () => {
  socket.emit(EmitType.ALL);
};

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

const onSocketDisconnect = () => {
  store.dispatch(actions.setSocketDisconnect());
  console.log(`Client connected: ${socket.id}`);
};

const onNotificationCloserClick = ({ id }: { id: Id }) => {
  socket.emit(EmitType.DELETE, [id]);
};

const onEntityRender = ({ id, entityType }: { id: Id; entityType: EntityType }) => {
  const selector = entitySelector[entityType];
  const entity = selector(store.getState().notification, id);

  if (!entity) {
    return;
  }

  const { ids } = entity.notifications;

  socket.emit(EmitType.DELETE, ids);
};

socket.on('connection', () => {
  console.log(`Client connected: ${socket.id}`);
});

socket.on('connect', onSocketConnect);
socket.on(EmitType.ALL, onNotificationAll);
socket.on(EmitType.CREATE, onNotificationCreate);
socket.on(EmitType.DELETE, onNotificationDelete);
socket.on('disconnect', onSocketDisconnect);

export { onNotificationAll, onNotificationCreate, onNotificationDelete, onNotificationCloserClick, onEntityRender };
