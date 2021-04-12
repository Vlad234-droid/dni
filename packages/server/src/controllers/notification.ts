import { handleData } from '../services/notification';

export const handleHook: Middleware = async (req, res) => {
  try {
    // console.log(JSON.stringify(req.body, null, 2));
    handleData(req.body);
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};
