type PaginationPayload = {
  _limit: number;
  _start: number;
};

type FilterPayload = {
  // filtering
  _where?: object;

  // sorting
  _sort?: string;
};

type EntityListPayload = FilterPayload & PaginationPayload;

export type { FilterPayload, PaginationPayload, EntityListPayload };
