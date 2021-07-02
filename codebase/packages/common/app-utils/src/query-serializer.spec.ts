import { querySerializer } from './query-serializer';

describe('querySerializer', () => {
  it('parse', () => {
    expect(
      querySerializer.parse(
        '?text=abc&fullName=&page=2&onlyFlexiWorkers=false&onlyMyTeam=true&start=2020-06-23T00%3A00%3A00.000Z',
      ),
    ).toEqual({
      onlyFlexiWorkers: false,
      onlyMyTeam: true,
      page: 2,
      fullName: '',
      text: 'abc',
      start: {
        day: 23,
        dayOfWeek: 2,
        hour: 0,
        minute: 0,
        month: 6,
        year: 2020,
      },
    });
  });

  it('stringify', () => {
    expect(
      querySerializer.stringify({
        onlyFlexiWorkers: false,
        onlyMyTeam: true,
        page: 2,
        fullName: '',
        text: 'abc',
        start: {
          day: 23,
          hour: 0,
          minute: 0,
          month: 6,
          year: 2020,
        },
        undefinedValue: undefined,
      }),
    ).toEqual('onlyFlexiWorkers=false&onlyMyTeam=true&page=2&fullName=&text=abc&start=2020-06-23T00%3A00%3A00.000Z');
  });
});
