type PaginationPayload = {
  _limit: number;
  _start: number;
};

type FilterPayload = {
  // filtering
  _where?: object;

  // sorting
  _sort?: 'created_at:desc' | 'created_at:asc';
};

type EntityListPayload = FilterPayload & PaginationPayload;

export type { FilterPayload, PaginationPayload, EntityListPayload };
