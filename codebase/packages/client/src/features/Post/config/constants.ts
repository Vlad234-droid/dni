import { FilterPayload } from 'types/payload';

const ALL = 'ALL';
const BY_EVENT = 'BY_EVENT';
const BY_NETWORK = 'BY_NETWORK';
const ARCHIVED = 'ARCHIVED';

export const DEFAULT_FILTERS: FilterPayload = {
  _sort: 'published_at:desc',
};

export { ALL, BY_EVENT, BY_NETWORK, ARCHIVED };
