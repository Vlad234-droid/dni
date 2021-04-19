import { DateObjectUnits } from 'luxon';

interface FormData {
  image?: File | null;
  title: string;
  network: string;
  maxParticipants: number;
  startDate: DateObjectUnits;
  endDate: DateObjectUnits;
  description?: string;
  surveryUrl?: string;
}

export default interface Event extends FormData {
  id: number;
  participants?: number;
}

type Names = keyof FormData;

type Filter = 'ON_AIR' | 'THIS_MONTH';

export type { FormData, Names, Filter };
