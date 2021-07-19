import { unionize, ofType, UnionOf, RecordOf, TagsOf } from 'unionize';

import { FetchError } from '@energon/fetch-client';
import type { OneloginError } from '@dni-connectors/onelogin';
import { DeepPartial } from '@energon/type-utils';

export type ApplicationError = UnionOf<typeof ApplicationError>;
const ApplicationError = unionize({
  FetchError: ofType<FetchError>(),
  InvalidRequest: ofType<{ msg: string }>(),
  IllegalState: ofType<{ msg: string }>(),
  AccessDenied: ofType<{ msg: string }>(),
  UnexpectedApiResponse: ofType<{
    url: string;
    status: number;
    msg?: string;
    receivedResponse?: unknown;
    expectedResponse?: DeepPartial<unknown>;
  }>(),
  SingleSignOn: ofType<OneloginError>(),
  Unrecognized: () => ofType<{ thrown: unknown }>(),
});

type Tags = TagsOf<typeof ApplicationError>;
export type CaseOf<T extends Tags> = RecordOf<typeof ApplicationError>[T];

const appErrorFromUnknown = (thrown?: unknown): ApplicationError => {
  if (!thrown) {
    return ApplicationError.Unrecognized({ thrown });
  }

  if (FetchError.is(thrown)) {
    return ApplicationError.FetchError(thrown);
  }

  if (isOneloginError(thrown)) {
    return ApplicationError.SingleSignOn(thrown);
  }

  if (isTaggedObject(thrown) && isApplicationError(thrown)) {
    return thrown;
  }

  return ApplicationError.Unrecognized({ thrown });
};

function isTaggedObject(err: unknown): err is { tag: unknown } {
  return typeof err === 'object' && err !== null && 'tag' in err;
}

function isApplicationError(err: { tag: unknown }): err is ApplicationError {
  return typeof err.tag === 'string' && err.tag in ApplicationError._Record;
}

function isOneloginError(err: unknown): err is OneloginError {
  const expectedName: OneloginError['name'] = 'OneloginError';
  return (err as Error)?.name === expectedName;
}

const toResponseStatus = ApplicationError.match({
  AccessDenied: () => 403,
  InvalidRequest: () => 400,
  FetchError: ({ status }) => status,
  SingleSignOn: ({ status }) => status,
  UnexpectedApiResponse: ({ status }) => status,
  default: () => 500,
});

const toHTMLResponse = (error: ApplicationError) => {
  const status = toResponseStatus(error);
  switch (status) {
    case 403:
      return '403.html';
    case 500:
    default:
      return '500.html';
  }
};

const toResponseMessage = ApplicationError.transform({
  Unrecognized: () =>
    ApplicationError.Unrecognized({ thrown: '[hidden underlying error]' }),
});

export {
  ApplicationError,
  appErrorFromUnknown,
  toResponseStatus,
  toResponseMessage,
  toHTMLResponse,
};
