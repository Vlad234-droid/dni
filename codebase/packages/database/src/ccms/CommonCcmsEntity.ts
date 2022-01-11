export interface CommonCcmsEntity<TDate> {
  id: number;
  slug: string;
  title: string;
  description?: string;
  shortDescription?: string;
  archived?: boolean;
  created_at: TDate;
  updated_at: TDate;
  published_at: TDate;
  network?: CommonCcmsEntity<TDate> | CommonCcmsEntity<TDate>[];
  event?: CommonCcmsEntity<TDate> | CommonCcmsEntity<TDate>[];
}
