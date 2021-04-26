import { FormField } from 'features/GenericForm';
import {
  TextArea,
  TextInput,
  FileInput,
  DateTimePicker,
} from 'features/Common';

// TODO: #fix type - check name ignore
type Names = keyof FormData;

const formFields: Array<FormField<Names>> = [
  {
    Element: FileInput,
    // @ts-ignore
    name: 'image',
    testID: 'image',
    label: 'Image',
  },
  {
    Element: TextInput,
    // @ts-ignore
    name: 'title',
    placeholder: 'Name of event',
    testID: 'eventName',
    label: 'Name your event',
    required: true,
  },
  {
    Element: TextInput,
    // @ts-ignore
    name: 'network',
    placeholder: 'Placeholder text',
    testID: 'network',
    label: 'Network',
    required: true,
  },
  {
    Element: TextInput,
    // @ts-ignore
    name: 'maxParticipants',
    placeholder: '1',
    testID: 'participants',
    label: 'Max participants',
    required: true,
  },
  {
    Element: DateTimePicker,
    // @ts-ignore
    name: 'startDate',
    testID: 'startDate',
    labels: ['Start date', 'Start time'],
    required: true,
  },
  {
    Element: DateTimePicker,
    // @ts-ignore
    name: 'endDate',
    testID: 'endDate',
    labels: ['End date', 'End time'],
    required: true,
  },
  {
    Element: TextArea,
    // @ts-ignore
    name: 'description',
    placeholder: 'A few word about this network',
    testID: 'message',
    label: 'Description',
  },
  {
    Element: TextInput,
    // @ts-ignore
    name: 'surveyUrl',
    placeholder: 'A few word about your event',
    testID: 'surveyUrl',
    label: 'Link to Survey',
  },
];

// @ts-ignore
export default formFields;
