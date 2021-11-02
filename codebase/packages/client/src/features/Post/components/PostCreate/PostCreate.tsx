import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import FormGroup from '@beans/form-group';
import Link from '@beans/link';
import Button from '@beans/button';

import { FieldWrapper, TextArea, TextInput } from 'features/Common';
import { LINKS } from 'config/constants';
import { ToastSkin, toasterActions } from 'features/Toaster';
import { shareStory } from 'features/Auth';

import { FormData } from '../../config/types';
import formSchema from '../../config/schema';
import { Wrapper, Buttons } from './styled';

type Props = {
  entityId: number;
  onClose: () => void;
};

const PostCreate: FC<Props> = ({ entityId, onClose }) => {
  const dispatch = useDispatch();

  const [isAccepted, setAccepted ] = useState(false)

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {

    // TODO: pass here networkTitle or networkId
    const result = await dispatch(
      shareStory({
        title: data.title,
        story: data.content,
      }),
    );
    // @ts-ignore
    if (shareStory.fulfilled.match(result)) {
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
