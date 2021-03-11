import { FormField } from 'features/GenericForm';
import { TextArea, TextInput, FileInput, Select } from 'features/Common';
import { Names } from './types';

const formFields: Array<FormField<Names>> = [
  {
    Element: FileInput,
    name: 'image',
    testID: 'image',
    label: 'Image (optional)',
  },
  {
    Element: TextInput,
    name: 'title',
    placeholder: 'Name of network',
    testID: 'title',
    label: 'Name of network',
  },
  {
    Element: TextInput,
    name: 'manager',
    placeholder: 'BruceDickinson@tesco.com',
    testID: 'manager',
    label: 'Content Manager of Network',
  },
  {
    Element: TextInput,
    name: 'email',
    placeholder: 'email',
    testID: 'email',
    label: 'Contact email',
  },
  {
    Element: TextArea,
    name: 'description',
    placeholder: 'A few word about this network',
    testID: 'message',
    label: 'Description (optional)',
  },
  {
    Element: Select,
    name: 'partnership',
    placeholder: 'Choose Partner',
    testID: 'partnership',
    label: 'Network Partnership',
    // hardcode options now
    options: ['Choose Partner', 'test1@tesco.com', 'test2@tesco.com'],
  },
];

export default formFields;
