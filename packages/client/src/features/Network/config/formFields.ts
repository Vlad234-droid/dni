import { FormField } from 'features/GenericForm';
import { TextArea, TextInput, FileInput } from 'features/Common';
import { Names } from './types';

export type Partner = {
  id: number;
  name: string;
  link?: string;
  avatar: string;
};

export const partners: Array<Partner> = [
  { id: 1, name: 'Diabetes UK', link: 'http://websitename.com/', avatar: '' },
  {
    id: 2,
    name: 'Children of the World',
    link: 'http://childrenoftheworld.com/',
    avatar: '',
  },
  {
    id: 3,
    name: 'British Heart Foundation',
    link: 'http://Britishheartfoundation.org/',
    avatar: '',
  },
  { id: 4, name: 'Green Peace', link: 'http://greenpeace.com/', avatar: '' },
  { id: 5, name: 'One Drop', link: 'https://www.onedrop.org/', avatar: '' },
];

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
];

export default formFields;
