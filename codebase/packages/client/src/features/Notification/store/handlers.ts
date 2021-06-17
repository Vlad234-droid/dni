import store from 'store';
import { actions } from './slice';
import { Id, EmitType, EntityType } from '../config/types';
import { entitySelector } from './selectors';
import { ToastSkin, toasterActions } from 'features/Toaster';

import { socket } from 'config/notification';

const onSocketConnect = () => {
  socket && socket.emit(EmitType.ALL);
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
  console.log(`Client connected: ${socket && socket.id}`);
};

const onNotificationCloserClick = ({ id }: { id: Id }) => {
  socket && socket.emit(EmitType.DELETE, [id]);
};

const onEntityRender = ({ id, entityType }: { id: Id; entityType: EntityType }) => {
  const selector = entitySelector[entityType];
  const entity = selector(store.getState().notification, id);

  if (!entity) {
    return;
  }

  const { ids } = entity.notifications;

  socket && socket.emit(EmitType.DELETE, ids);
};

const onCmsEvent = (body: string) => {
  console.log(`CMS_EVENT received: ${body}`);
};

if (socket) {
  socket.on('connection', () => {
    socket && console.log(`Client connected: ${socket.id}`);
  });

  socket.on('connect', onSocketConnect);
  socket.on(EmitType.ALL, onNotificationAll);
  socket.on(EmitType.CREATE, onNotificationCreate);
  socket.on(EmitType.DELETE, onNotificationDelete);
  socket.on('disconnect', onSocketDisconnect);

  socket.on('CMS_EVENT', onCmsEvent);
}

export { onNotificationAll, onNotificationCreate, onNotificationDelete, onNotificationCloserClick, onEntityRender };
