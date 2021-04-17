import { Response } from 'express';
import { getOpenIdUserInfo } from '@energon/onelogin';

const profileInfoExtractor = (res: Response) => {
  return getOpenIdUserInfo(res);
};

export { profileInfoExtractor };
