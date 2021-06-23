import { handleData } from '../services/notification';

export const handleHook: Middleware = async (req, res) => {
  try {
    console.log('handleHook:\n%s', JSON.stringify(req.body, null, 2));
    await handleData(req.body);
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const handleCepHook: Middleware = async (req, res) => {
  try {
    const payload: string = JSON.stringify(req.body, null, 2);
    console.log('handleCepHook:\n%s', payload);
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};
