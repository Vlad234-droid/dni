import { Request, Response } from 'express';
import { CcmsTriggerEventEnum } from '@dni/database';
import { handleCepRequest } from '../services';


export type CepPayload = {
  id: string;
  model: string;
  trigger: CcmsTriggerEventEnum;
  created_at: string;
  updated_at: string;
};


export const consumeCepEvent = async (req: Request<{}, CepPayload>, res: Response) => {
    try {
      const payload: string = JSON.stringify(req.body, null, 2);
      console.log('handleCepHook:\n%s', payload);
      await handleCepRequest(req, res);
      return res.status(200).json('ok');
    } catch (e) {
      console.log(e);
      return res.status(500).json('Internal Server error');
    }
  };
  
  