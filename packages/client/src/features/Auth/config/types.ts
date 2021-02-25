type LoginAction = (payload: { email: string; password: string }) => void;
type LogoutAction = () => void;

type DynamicData = {
  userId: number;
  ownerId: number;
};

type Rule = {
  static: string[];
  dynamic?: {
    [key: string]: (props: DynamicData) => boolean;
  };
};

export type { LoginAction, LogoutAction, DynamicData, Rule };
