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
    name: 'title',
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
    name: 'maxParticipants',
    placeholder: '1',
    testID: 'participants',
    label: 'Max participants',
    required: true,
  },
  {
    Element: DateTimePicker,
    name: 'startedAt',
    testID: 'startDate',
    labels: ['Start date', 'Start time'],
    required: true,
  },
  {
    Element: DateTimePicker,
    name: 'finishedAt',
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
  {
    Element: TextInput,
    name: 'surveyLink',
    placeholder: 'A few word about your event',
    testID: 'surveyLink',
    label: 'Link to Survey',
  },
];

export default formFields;
