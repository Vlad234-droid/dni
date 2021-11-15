import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import FormGroup from '@beans/form-group';
import Link from '@beans/link';
import Button from '@beans/button';

import { FieldWrapper, TextArea, TextInput } from 'features/Common';
import { LINKS } from 'config/constants';

import formSchema from '../../config/schema';
import { Wrapper, Buttons } from './styled';
import { FormData } from '../../config/types';

type Props = {
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
};

const PostCreate: FC<Props> = ({ onClose, onSubmit }) => {
  const [isAccepted, setAccepted ] = useState(false)

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(formSchema),
  });

  const submitForm = (data: FormData) => {
    onSubmit(data);
  }

  return (
    <Wrapper data-testid='post-create'>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper>
          <TextInput
            // @ts-ignore
            domRef={register}
            name={'title'}
            aria-label={'title'}
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
            aria-label={'story'}
            name={'story'}
            placeholder={'Input story...'}
            error={errors['story']?.message}
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
