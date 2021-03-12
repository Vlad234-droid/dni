import { FormField } from 'features/GenericForm';
import { TextArea, TextInput, FileInput, Multiselect } from 'features/Common';
import { Names } from './types';

const formFields: Array<FormField<Names>> = [
  {
    Element: FileInput,
    name: 'image',
    testID: 'image',
    label: 'Image',
  },
  {
    Element: TextInput,
    name: 'title',
    placeholder: 'Name of network',
    testID: 'title',
    label: 'Name of network',
    required: true,
  },
  {
    Element: TextInput,
    name: 'manager',
    placeholder: 'BruceDickinson@tesco.com',
    testID: 'manager',
    label: 'Content Manager of Network',
    required: true,
  },
  {
    Element: TextInput,
    name: 'email',
    placeholder: 'email',
    testID: 'email',
    label: 'Contact email',
    required: true,
  },
  {
    Element: TextArea,
    name: 'description',
    placeholder: 'A few word about this network',
    testID: 'message',
    label: 'Description',
    required: true,
  },
  {
    Element: Multiselect,
    name: 'partnership',
    placeholder: 'Choose Partner',
    testID: 'partnership',
    label: 'Network Partnership',
    required: true,
    options: [
      { id: 'test1@tesco.com', labelText: 'test1@tesco.com', selected: true },
      { id: 'test2@tesco.com', labelText: 'test2@tesco.com', selected: false },
      { id: 'test3@tesco.com', labelText: 'test3@tesco.com', selected: false },
    ],
  },
];

export default formFields;
