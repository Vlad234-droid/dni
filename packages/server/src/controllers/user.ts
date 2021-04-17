import { profileInfoExtractor } from '../services/user';

export const getProfile: Middleware = async (_, res) => {
  try {
    return res.status(200).json(profileInfoExtractor(res));
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};
