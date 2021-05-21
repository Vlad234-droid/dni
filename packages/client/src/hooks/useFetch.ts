import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import Loading from 'types/loading';
import API from 'utils/api';

type Config = {
  [key: string]: string;
};

interface FetchHandler<T, R = T> {
  (exec: ExecHandler<T>, res?: ResponseHandler<T, R>, config?: Config): void;
}
interface ExecHandler<T> {
  (api: typeof API): Promise<T>;
}
interface ResponseHandler<T, R = T> {
  (res: T): R;
}

type Response<T, R> = [
  {
    loading: Loading;
    response: R | null;
    error?: string;
    setResponse: Dispatch<SetStateAction<R | null>>;
  },
  FetchHandler<T, R>,
];

function useFetch<T, R = T>(initialValue: R | null = null): Response<T, R> {
  const [loading, setLoading] = useState(Loading.IDLE);
  const [error, setError] = useState();
  const [response, setResponse] = useState<R | null>(initialValue);
  const executer = useRef<ExecHandler<T>>();
  const responseHandler = useRef<ResponseHandler<T, R>>();

  const doFetch: FetchHandler<T, R> = (
    exec: ExecHandler<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res: ResponseHandler<T, R> = (res) => res as any,
  ) => {
    executer.current = exec;
    responseHandler.current = res;

    setLoading(Loading.PENDING);
  };

  useEffect(() => {
    (async () => {
      if (
        loading === Loading.PENDING &&
        responseHandler.current &&
        executer.current
      ) {
        try {
          const response = await executer.current(API);
          setResponse(responseHandler.current(response));
          setLoading(Loading.SUCCEEDED);
        } catch (error) {
          console.log('error', error);
          setError(error.message);
          setLoading(Loading.FAILED);
        }
      }
    })();
  }, [loading]);

  return [{ loading, response, error, setResponse }, doFetch];
}

export default useFetch;
