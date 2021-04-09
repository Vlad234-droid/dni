type File = {
  alternativeText: string;
  caption: string;
  ext: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  size: number;
  url: string;
  width: number;
};

enum Status {
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
}

type DateString = string;

export type { DateString, File };

export { Status };
