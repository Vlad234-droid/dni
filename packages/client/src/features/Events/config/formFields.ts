import { FormField } from 'features/GenericForm';
import {
  TextArea,
  TextInput,
  FileInput,
  DateTimePicker,
} from 'features/Common';
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
    name: 'name',
    placeholder: 'Name of event',
    testID: 'eventName',
    label: 'Name your event',
    required: true,
  },
  {
    Element: TextInput,
    name: 'network',
    placeholder: 'Placeholder text',
    testID: 'network',
    label: 'Network',
    required: true,
  },
  {
    Element: TextInput,
    name: 'participantCount',
    placeholder: '1',
    testID: 'participants',
    label: 'Max participants',
    required: true,
  },
  {
    Element: DateTimePicker,
    name: 'startDate',
    placeholder: 'email',
    testID: 'startDate',
    labels: ['Start date', 'Start time'],
    required: true,
  },
  {
    Element: DateTimePicker,
    name: 'endDate',
    placeholder: 'email',
    testID: 'startDate',
    labels: ['End date', 'End time'],
    required: true,
  },
  {
    Element: TextArea,
    name: 'description',
    placeholder: 'A few word about this network',
    testID: 'message',
    label: 'Description',
  },
];

export default formFields;
