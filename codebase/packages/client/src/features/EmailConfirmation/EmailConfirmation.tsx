import React, { FC, useEffect, useMemo, useState } from 'react';

import Loading from 'types/loading';
import useFetch from 'hooks/useFetch';

import { Error, Spinner } from 'features/Common';
import { Content, Wrapper } from './styled';

type Props = {
  token: string;
};

const EmailConfirmation: FC<Props> = ({ token }) => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const [{ response, loading, error }, doFetch] = useFetch<Event[]>([]);

  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    setSuccess(loading !== Loading.PENDING && !error);
  }, [response, loading, error]);

  useEffect(() => {
    doFetch(
      (api) => api.contact.refreshPersonalEmailByToken({ token }),
      (res) => res,
    );
  }, []);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: 'Something went wrong', message: error }} />;

    if (!response && isLoading) return <Spinner height='500px' />;

    return <Content>{success ? 'Your email address has been successfully changed' : 'Something went wrong'}</Content>;
  }, [success, error, response, isLoading]);

  return <Wrapper>{memoizedContent}</Wrapper>;
};

export default EmailConfirmation;
