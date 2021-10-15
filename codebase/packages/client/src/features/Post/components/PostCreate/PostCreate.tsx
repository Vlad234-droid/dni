import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import FormGroup from '@beans/form-group';
import Link from '@beans/link';
import Button from '@beans/button';
import omit from 'lodash.omit';

import { FieldWrapper, TextArea, TextInput } from 'features/Common';
import { LINKS } from 'config/constants';
import { ToastSkin, toasterActions } from 'features/Toaster';
import { byIdSelector } from 'features/Network';

import formSchema from '../../config/schema';
import { Wrapper, Buttons } from './styled';
import { createOne, SetOnePayload } from '../../store';

type Props = {
  entityId: number;
  onClose: () => void;
};

const PostCreate: FC<Props> = ({ entityId, onClose }) => {
  const dispatch = useDispatch();
  const network = useSelector(byIdSelector(entityId));

  const [isAccepted, setAccepted ] = useState(false)

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // TODO: id of user?
    const result = await dispatch(
      createOne({
        ...omit(data, 'confirm'),
        network: network,
        anonymous: false,
        archived: false,
      } as unknown as SetOnePayload),
    );
    // @ts-ignore
    if (createOne.fulfilled.match(result)) {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_SUCCESS,
        }),
      );
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_ERROR,
        }),
      );
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldWrapper>
          <TextInput
            // @ts-ignore
            domRef={register}
            name={'title'}
            placeholder={'Input title...'}
            // @ts-ignore
            error={errors['title']?.message}
            id={'title'}
            hideLabel
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextArea
            // @ts-ignore
            domRef={register}
            name={'content'}
            placeholder={'Input story...'}
            error={errors['content']?.message}
            hideLabel
            required
          />
        </FieldWrapper>
        <Link href={LINKS.privacyPolicy}>Privacy Policy</Link>
        <FieldWrapper>
          <FormGroup errorMessage={errors['confirm']?.message} error={Boolean(errors['confirm']?.message)}>
            <CheckboxWithLabel
              id='confirm'
              labelText='I agree to provide my personal story/data for the publication within this network, including the moderation version of my story'
              checked={isAccepted}
              onChange={() => setAccepted(!isAccepted)}
              // @ts-ignore
              domRef={register}
              name={'confirm'}
              required
            />
          </FormGroup>
        </FieldWrapper>
        <Buttons>
          <Button type='submit' size={'md'}>
            Publish
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </Buttons>
      </form>
    </Wrapper>
  );
};

export default PostCreate;
