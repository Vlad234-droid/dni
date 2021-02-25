import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

// utils
import API from 'utils/api';
import { AxiosResponse } from 'axios';

type Config = {
  [key: string]: string;
};

interface FetchHandler<T, R = T> {
  (exec: ExecHandler<T>, res?: ResponseHandler<T, R>, config?: Config): void;
}
interface ExecHandler<T> {
  (api: typeof API): Promise<AxiosResponse<T>>;
}
interface ResponseHandler<T, R = T> {
  (res: T): R;
}

type Response<T, R> = [
  {
    isLoading: boolean;
    response: R | null;
    error: string | null;
    setResponse: Dispatch<SetStateAction<R | null>>;
  },
  FetchHandler<T, R>,
];

function useFetch<T, R = T>(initialValue: R | null = null): Response<T, R> {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

    setLoading(true);
  };

  useEffect(() => {
    (async () => {
      if (isLoading && responseHandler.current && executer.current) {
        try {
          const { data: response } = await executer.current(API);
          setResponse(responseHandler.current(response));
        } catch (error) {
          console.log('Somthing going wrong!', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [isLoading]);

  return [{ isLoading, response, error, setResponse }, doFetch];
}

export default useFetch;
