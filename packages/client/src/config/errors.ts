import { ErrorType } from '../types/error';

const ERRORS = {
  [ErrorType.PAGE_NOT_FOUND]: {
    title: 'Something went wrong',
    message:
      "We couldn't find the page you were looking for. Please check the website address or click home and try again",
  },
  [ErrorType.SERVER_ERROR]: {
    title: '',
    message: '',
  },
  [ErrorType.ID_NOT_FOUND]: {
    title: 'Request ID not found',
    message:
      'We can not find the request ID you are looking for, please try again.',
  },
};

export { ERRORS };
