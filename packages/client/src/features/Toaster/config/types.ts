type Id = number | string;

enum ToastVariant {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFORMATION = 'info',
}

enum ToastSkin {
  EXAMPLE = 'example',
  ENTITY_CREATE_SUCCESS = 'entity_create_success',
  ENTITY_CREATE_ERROR = 'entity_create_error',
}

type Toast = {
  id: Id;
  skin: ToastSkin;
  data?: Partial<{
    id: Id;
  }>;
};

export { ToastVariant, ToastSkin };
export type { Toast };
