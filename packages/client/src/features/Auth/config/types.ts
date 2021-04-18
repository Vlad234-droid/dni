type FetchUserAction = () => void;

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

export type { FetchUserAction, DynamicData, Rule };
