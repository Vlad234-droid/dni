type FormData = {
  title: string;
  description: string;
};

type Names = keyof FormData;

export type { FormData, Names };
