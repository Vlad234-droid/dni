import React, { FC } from 'react';
import BeansModal from '@beans/modal';
import Link from '@beans/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ConfirmationModal, FieldWrapper, TextInput } from 'features/Common';
import { Page } from 'features/Page';

import schema from '../../config/schema';
import useSaveEmail from '../../hooks/useSaveEmail';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onError: () => void;
};

const ModalEmailSettings: FC<Props> = ({ isOpen, onClose, onConfirm, onError }) => {
  const [email, onSubmit] = useSaveEmail(onConfirm, onError);

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <BeansModal open={isOpen} onChange={onClose} id='settings'>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit(onSubmit)}
        renderContent={() => (
          <div>
            <div>Please note, to receive important updates you need to update your email.</div>
            <div>Please check your current email and amend it if required.</div>
            <form>
              <FieldWrapper>
                <TextInput
                  // @ts-ignore
                  domRef={register}
                  defaultValue={email}
                  name={'email'}
                  placeholder={'email'}
                  // @ts-ignore
                  error={errors['email']?.message}
                  required
                />
              </FieldWrapper>
            </form>
            <div>Notification settings could be changed <Link href={`/${Page.NOTIFICATION_SETTINGS}`}>here</Link>.</div>
          </div>
        )}
      />
    </BeansModal>
  );
};

export default ModalEmailSettings;
