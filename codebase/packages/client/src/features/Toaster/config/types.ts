type Id = number | string;

enum ToastVariant {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFORMATION = 'info',
}

enum ToastSkin {
  EXAMPLE = 'EXAMPLE',
  ENTITY_CREATE_SUCCESS = 'ENTITY_CREATE_SUCCESS',
  ENTITY_CREATE_ERROR = 'ENTITY_CREATE_ERROR',
  LINK_COPY_SUCCESS = 'LINK_COPY_SUCCESS',
  INTERVAL_LIMIT = 'INTERVAL_LIMIT',
  WRONG_INTERVAL = 'WRONG_INTERVAL',
}

type Toast = {
  id: Id;
  skin: ToastSkin;
  data?: Partial<{
    id: Id;
  }>;
  timeout: number;
};

export { ToastVariant, ToastSkin };
export type { Toast };