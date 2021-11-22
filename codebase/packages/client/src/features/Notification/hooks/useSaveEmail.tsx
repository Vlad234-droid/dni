import { useEffect, useState } from 'react';

import { toasterActions, ToastSkin } from 'features/Toaster';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';

import { getPersonalEmail, updatePersonalEmail, createPersonalEmail } from '../store';
import { FormData } from '../config/types';

const SUCCESS_TOAST_ID = 'email-confirmation-success';
const ERROR_TOAST_ID = 'email-confirmation-error';

const useSaveEmail = (onSuccess?: () => void, onError?: () => void): [string, (data: FormData) => void] => {
  const dispatch = useDispatch();
  const { colleagueUUID } = useStore((state) => state.auth.user);
  const { personalEmail } = useStore((state) => state.notifications);
  const [emailAddress, setEmailAddress] = useState<string>('');

  // fetch personal email address
  useEffect(() => {
    if (!personalEmail) {
      dispatch(getPersonalEmail());
    }
  }, [colleagueUUID, personalEmail]);

  useEffect(() => {
    personalEmail && setEmailAddress(personalEmail.emailAddress);
  }, [personalEmail]);

  const showSuccessNotification = () =>
    dispatch(
      toasterActions.createToast({
        id: SUCCESS_TOAST_ID,
        skin: ToastSkin.EMAIL_CONFIRMATION_SUCCESS,
      }),
    );

  const showErrorNotification = () =>
    dispatch(
      toasterActions.createToast({
        id: ERROR_TOAST_ID,
        skin: ToastSkin.EMAIL_CONFIRMATION_ERROR,
      }),
    );

  const onSubmit = async (data: FormData) => {

    // do nothing or call onSuccess handler
    if (personalEmail?.emailAddress === data.email) {
      onSuccess && onSuccess();
    }

    // if the user changed the personal address
    if (personalEmail?.emailAddress && data.email && personalEmail?.emailAddress != data.email) {
      const result = await dispatch(
        updatePersonalEmail({
          ...personalEmail,
          emailAddress: data.email,
          oldEmailAddress: personalEmail?.emailAddress,
        }),
      );

      if (updatePersonalEmail.fulfilled.match(result)) {
        setEmailAddress(data.email);
        onSuccess && onSuccess();
        showSuccessNotification();
      } else {
        onError && onError();
        showErrorNotification();
      }
    }

    // if the user created his personal address
    if (!personalEmail && data.email) {
      const result = await dispatch(
        createPersonalEmail({
          emailAddress: data.email,
        }),
      );

      if (createPersonalEmail.fulfilled.match(result)) {
        setEmailAddress(data.email);
        onSuccess && onSuccess();
        showSuccessNotification();
      } else {
        onError && onError();
        showErrorNotification();
      }
    }
  };

  return [emailAddress, onSubmit];
};

export default useSaveEmail;
