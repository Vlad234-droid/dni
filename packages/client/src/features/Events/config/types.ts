interface FormData {
  image?: File | null;
  name: string;
  network: string;
  participantCount: number;
  email: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  link?: string;
}

export default interface Event extends FormData {
  id: number;
}

type Names = keyof FormData;

export type { FormData, Names };
