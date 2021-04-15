type Id = number | string;

type Emoji = {
  id: Id 
  title: string;
  slug: string;
  image: File | string;
}

type Emotion = {
  id: Id;
  count: number;
  emoji: Partial<{
    image: Partial<{
      url: string;
    }>;
  }>;
}

export type { Emoji, Emotion };
