import { ConnectorContext } from '@energon-connectors/core';

export type ApiBody = {
  recipients: [
    {
      _type?: 'static' | 'customer';
      destination: 'emailTo' | 'sms';
      property: 'defaultToAddress';
      address: string;
    },
  ];
  template?: {
    version: string;
    language: 'th' | 'en';
  };
  data?: Record<string, string>;
};

export type ApiParams = {
  templateId: string;
};

export type ApiInput<T, U> = {
  params: T;
  body: U;
};

export type ApiOutput = {
  description?: string;
  accepted: boolean;
  errors: [
    {
      property: string;
      reason: string;
      code: string;
    },
  ];
};

export type ContactApiContext = Pick<ConnectorContext, 'apiEnv' | 'markApiCall'>;
