import { FC, ReactElement } from 'react';

import { DynamicData } from '../../config/types';
import usePermission from '../../hooks/usePermission';

type Props = {
  perform: string;
  yes: () => Nullable<ReactElement>;
  no?: () => Nullable<ReactElement>;
  data?: DynamicData;
};

const CanPerform: FC<Props> = ({ perform, data, yes, no }) => {
  const hasPermission = usePermission(perform, data);

  return hasPermission ? yes() : no ? no() : null;
};

export default CanPerform;
