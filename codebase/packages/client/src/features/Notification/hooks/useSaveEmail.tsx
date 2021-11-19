import { useEffect, useState } from 'react';

import { toasterActions, ToastSkin } from 'features/Toaster';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { CONTACT_API_ENABLED } from 'config/constants';

import { getPersonalEmail, updatePersonalEmail, createPersonalEmail } from '../store';
import { FormData } from '../config/types';

const SUCCESS_TOAST_ID = 'settings-success-toast';
const ERROR_TOAST_ID = 'settings-success-toast';

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
        skin: ToastSkin.SETTINGS_SUCCESS,
        id: SUCCESS_TOAST_ID,
      }),
    );

  const showErrorNotification = () =>
    dispatch(
      toasterActions.createToast({
        skin: ToastSkin.WRONG_INTERVAL,
        id: ERROR_TOAST_ID,
      }),
    );

  const onSubmit = async (data: FormData) => {
    try {
      // if the user changed the personal address
      if (personalEmail?.emailAddress && data.email && personalEmail?.emailAddress != data.email) {
        const result = await dispatch(
          updatePersonalEmail({
            ...personalEmail,
            emailAddress: data.email,
            oldEmailAddress: personalEmail?.emailAddress,
          }),
        );

        if (CONTACT_API_ENABLED) {
          if (updatePersonalEmail.fulfilled.match(result)) {
            dispatch(
              toasterActions.createToast({
                id: 'email-confirmation-success',
                skin: ToastSkin.EMAIL_CONFIRMATION_SUCCESS,
              }),
            );
          } else {
            dispatch(
              toasterActions.createToast({
                id: 'email-confirmation-error',
                skin: ToastSkin.EMAIL_CONFIRMATION_ERROR,
              }),
            );
          }
        }
      }

      // if the user created his personal address
      if (!personalEmail && data.email) {
        await dispatch(
          createPersonalEmail({
            emailAddress: data.email,
          }),
        );
        dispatch(getPersonalEmail());
      }

      setEmailAddress(data.email);
      onSuccess && onSuccess();
      showSuccessNotification();
    } catch (err) {
      onError && onError();
      showErrorNotification();
    }
  };

  return [emailAddress, onSubmit];
};

export default useSaveEmail;
