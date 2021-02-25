import TextArea from 'features/TextArea';
import TextInput from 'features/TextInput';
import { FormField } from 'features/GenericForm';

import { Names } from './types';

const formFields: Array<FormField<Names>> = [
  {
    Element: TextInput,
    name: 'title',
    placeholder: 'Title',
    testID: 'title',
    label: 'Title1',
  },
  {
    Element: TextArea,
    name: 'description',
    placeholder: 'A few word about your event',
    testID: 'message',
  },
];

export default formFields;
