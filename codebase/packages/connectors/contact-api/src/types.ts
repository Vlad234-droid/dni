import { ConnectorContext } from '@energon-connectors/core';

export type ApiMsgBody = {
  recipients: [
    {
      _type?: 'static' | 'customer';
      destination: 'emailTo';
      property?: 'defaultToAddress';
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
  alias: 'Personal';
  emailAddress: string;
};

export type ApiParams = {
  templateId?: string;
  userId?: string;
  addressIdentifier?: string;
};

export type ApiInput<T, U = unknown> = {
  params: T;
  body?: U;
  traceId: string;
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

type ApiEmailAddresses = {
  addressIdentifier: string;
  alias: string;
  emailAddress: string;
};

export type ApiEmailAddressesOutput = ApiEmailAddresses[];

export type ApiEmailAddressOutput = ApiEmailAddresses;

export type ContactAPIHeaders = {
  Authorization: () => string;
};

export type ContactApiContext = Pick<ConnectorContext, 'identityClientToken' | 'apiEnv'>;
