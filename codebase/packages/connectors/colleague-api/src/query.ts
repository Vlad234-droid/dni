import { Colleague, ColleagueRequestBody } from './types';

type Input = {
  colleagueUUID: string;
  fields: Array<keyof Colleague>;
};

export const colleagueQuery = ({
  fields,
  colleagueUUID,
}: Input): ColleagueRequestBody => ({
  query: `
    query UserDetailsQuery($colleagueUUID: ID!) {
        colleague(identifier: $colleagueUUID) {
            ${fields.join(', ')}
        }
    }
    `,
  variables: {
    colleagueUUID,
  },
  operationName: 'UserDetailsQuery',
});
