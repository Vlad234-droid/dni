import { ConnectorContext } from '@energon-connectors/core';

export type ApiMsgBody = {
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

export type ApiEmailAddressBody = {
  emailAddress: string;
};

export type ApiParams = {
  templateId?: string;
  colleagueUUID?: string;
  emailIndex?: string;
};

export type ApiInput<T, U = unknown> = {
  params: T;
  body: U;
};

export type ApiMsgOutput = {
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

export type ApiEmailAddressesOutput = {
  emailAddresses: [
    {
      emailIndex: string;
      emailAddress: string;
      isPrimary: boolean;
      tags: string[];
    },
  ];
  domain: {
    returned: string[];
    omitted: string[];
  };
  ghsSuccess: boolean;
  ngcSuccess: boolean;
};

export type ApiEmailAddressOutput = {
  code: string;
  message: string;
  info: string;
  errors: string[];
};

export type ContactApiContext = Pick<ConnectorContext, 'apiEnv' | 'markApiCall'>;
