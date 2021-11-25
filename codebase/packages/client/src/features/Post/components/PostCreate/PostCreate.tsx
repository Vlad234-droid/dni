import React, { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckboxWithLabel from '@beans/checkbox-with-label';
import FormGroup from '@beans/form-group';
import Link from '@beans/link';
import Button from '@beans/button';
import DropdownGroup from '@beans/dropdown-group';
import isEmpty from 'lodash.isempty';

import { Error, FieldWrapper, Spinner, TextArea, TextInput } from 'features/Common';
import { LINKS } from 'config/constants';
import Network from 'features/Network';
import Loading from 'types/loading';

import formSchema from '../../config/schema';
import { FormData } from '../../config/types';
import { Buttons, Wrapper, Title } from './styled';

type Props = {
  onClose?: () => void;
  onSubmit: (data: FormData, network?: Network) => Promise<void>;
  networks: Network[];
  loading: Loading;
  error?: string;
};

const PostCreate: FC<Props> = ({ onClose, onSubmit, networks, loading, error }) => {
  const [isAccepted, setAccepted] = useState(false);
  const networksOptions = useMemo(
    () => {
      return networks.map(({ id, title }) => ({
        id,
        title,
      })).sort((a, b) => a.title.localeCompare(b.title));
    },
    [networks],
  );

  // TODO: remove
  const getNetworkByTitle = useCallback(
    (title) => networks.filter((network) => network.title === title)[0],
    [networks],
  );

  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(formSchema),
  });

  const submitForm = (data: FormData) => {
    // TODO: remove second arg
    onSubmit(data, getNetworkByTitle(data.networkTitle));
  };

  const memoizedContent = useMemo(() => {
    if (isEmpty(networks) && loading !== Loading.SUCCEEDED && loading !== Loading.FAILED)
      return <Spinner height='500px' />;

    if (error) return <Error errorData={{ title: error }} />;

    return (
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <Title>Please, input your story below</Title>
        {networksOptions.length && (
          <FieldWrapper>
            <DropdownGroup domRef={register} name={'networkTitle'}>
              {networksOptions.map(({ id, title }) => (
                <option key={id} value={title}>
                  {title}
                </option>
              ))}
            </DropdownGroup>
          </FieldWrapper>
        )}
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
              labelText='I agree to provide my personal story/data for the publication within this network I understand that this story may be shared in other locations, including the moderation version of my story'
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
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Buttons>
      </form>
    );
  }, [loading, error, networks, networksOptions, errors, isAccepted]);

  return <Wrapper data-testid='post-create'>{memoizedContent}</Wrapper>;
};

export default PostCreate;
