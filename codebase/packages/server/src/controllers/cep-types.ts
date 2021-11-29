import { CcmsTriggerEventEnum } from '@dni/database';

export type CepPayload = {
  id: string;
  model: string;
  trigger: CcmsTriggerEventEnum;
  created_at: string;
  updated_at: string;
};
    