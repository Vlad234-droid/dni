import { BaseType } from '@dni-connectors/colleague-cms-api';
import { FetchError } from '@energon/fetch-client';

type QueryType = number | string;

const buildCRUD = <T extends BaseType>(
  generateAll: () => T[],
  generateOne: () => T,
) => {
  const defaultSort = (data: T[]) =>
    data.sort((a, b) => (a.id > b.id ? 1 : -1));

  const notFound = () => {
    throw new FetchError('GET', '', 404, 'Not Found');
  };

  let copyData = defaultSort([...generateAll()]);

  return {
    findAll: (start: QueryType = 0, limit: QueryType = 10) => {
      // TODO: add sort and filtering
      return defaultSort(copyData.slice(+start, +limit));
    },
    findBy: (id: QueryType) => {
      if (Number.isNaN(+id)) {
        return copyData.length;
      }

      const item = copyData.find((post) => post.id == id);

      if (item) {
        return item;
      }

      notFound();
    },
    deleteBy: (id: QueryType) => {
      const item = copyData.find((post) => post.id == id);

      if (!item) {
        notFound();
      }

      copyData = copyData.filter((post) => post.id != item!.id);
      return item;
    },
    createOne: () => {
      const item = generateOne();
      copyData.push(item);

      return item;
    },
    updateOne: (id: QueryType) => {
      const oldIdx = copyData.findIndex((post) => post.id == id);

      if (!oldIdx) {
        notFound();
      }

      const item = { ...generateOne(), id: +id };

      copyData[oldIdx] = item;

      return item;
    },
  };
};

export { buildCRUD };
