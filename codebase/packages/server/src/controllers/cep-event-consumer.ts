import { Handler, Request, Response } from 'express';
import { handleCepRequest } from '../services';
import { CepPayload } from './cep-types';

export const consumeCepEvent: Handler = async (req: Request<{}, CepPayload>, res: Response) => {
  try {
    await handleCepRequest(req, res);
    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};
