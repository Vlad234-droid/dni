type PaginationPayload = {
  _limit: number;
  _start: number;
};

type FilterPayload = {
  // filtering
  _where?: object;

  // sorting
  _sort?: string;

  id_in?: number[];
};

type EntityListPayload = FilterPayload & PaginationPayload;

export type { FilterPayload, PaginationPayload, EntityListPayload };
