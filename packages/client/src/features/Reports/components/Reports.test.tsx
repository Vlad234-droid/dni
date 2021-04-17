import { renderWithTheme } from 'utils/testUtils';

import { PERIOD, REGION, FORMAT } from 'features/Page/components/Reports';

import Reports, { REPORT_TEST_ID } from './Reports';

describe('Reports', () => {
  it('should render Reports', () => {
    const { getByTestId } = renderWithTheme(<Reports showed={FORMAT} />);

    expect(getByTestId(REPORT_TEST_ID)).toBeInTheDocument();
  });

  it(`should render diagram for ${PERIOD}`, () => {
    const { getByTestId } = renderWithTheme(<Reports showed={PERIOD} />);

    expect(getByTestId(PERIOD)).toBeInTheDocument();
  });

  it(`should render diagram only for ${REGION}`, () => {
    const { getByTestId } = renderWithTheme(<Reports showed={REGION} />);

    expect(getByTestId(REGION)).toBeInTheDocument();
  });

  it(`should render diagram only for ${FORMAT}`, () => {
    const { getByTestId } = renderWithTheme(<Reports showed={FORMAT} />);

    expect(getByTestId(FORMAT)).toBeInTheDocument();
  });
});
