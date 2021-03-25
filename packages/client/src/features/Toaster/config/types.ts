type Id = number | string;

enum ToastVariant {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFORMATION = 'info',
}

enum ToastSkin {
  EXAMPLE = 'example',
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
