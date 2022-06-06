import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@beans/button';

import Loading from 'types/loading';
import useFetch from 'hooks/useFetch';
import { Spinner, Error } from 'features/Common';
import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { getPersonalEmail } from 'features/Notification';
import { Page } from 'features/Page';

import { Content, Wrapper, Email } from './styled';

type Props = {
  token: string;
};

const EmailConfirmation: FC<Props> = ({ token }) => {
  const dispatch = useDispatch();
  const { personalEmail } = useStore((state) => state.notifications);
  const [success, setSuccess] = useState<boolean | null>(null);

  const [{ loading, error }, doFetch] = useFetch<unknown>([]);

  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    dispatch(getPersonalEmail()); // remove

    if (loading === Loading.SUCCEEDED) {
      dispatch(getPersonalEmail());
      setSuccess(true);
    }

    if (loading === Loading.FAILED) {
      setSuccess(false);
    }
  }, [loading]);

  useEffect(() => {
    doFetch(
      (api) => api.contact.refreshPersonalEmailByToken({ token }),
      (res) => res,
    );
  }, []);

  const defaultContent = useMemo(
    () => (
      <Content>
        Email change was not completed. Please try resetting the email one more time.
        <Link to={`/${Page.NOTIFICATION_SETTINGS}`}>
          <Button>Settings</Button>
        </Link>
      </Content>
    ),
    [],
  );

  const memoizedContent = useMemo(() => {
    if (error) return defaultContent;

    if (isLoading || !personalEmail) return <Spinner height='500px' />;

    if (success)
      return (
        <Content>
          Your email address has been successfully changed to&nbsp;
          <Email>{personalEmail!.emailAddress}</Email>
        </Content>
      );

    return defaultContent;
  }, [success, error, isLoading, personalEmail, defaultContent]);

  return <Wrapper>{memoizedContent}</Wrapper>;
};

export default EmailConfirmation;
