import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { useFormContext as mockUseFormContext } from 'react-hook-form';
import { renderWithTheme } from 'utils/testUtils';
import Multiselect, {
  TEST_ID,
  formatValues,
  getSelectedValues,
} from './Multiselect';

const NAME = 'testName';

const TEST_OPTIONS = [
  { id: 'test1@tesco.com', labelText: 'test1@tesco.com', selected: true },
  { id: 'test2@tesco.com', labelText: 'test2@tesco.com', selected: false },
  { id: 'test3@tesco.com', labelText: 'test3@tesco.com', selected: false },
];

const LABEL = 'testLabel';

const render = () => {
  renderWithTheme(
    <Multiselect
      name={NAME}
      label={LABEL}
      placeholder={LABEL}
      options={TEST_OPTIONS}
    />,
  );
};

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
}));

beforeEach(() => {
  // @ts-ignore
  mockUseFormContext.mockReturnValue({
    register: jest.fn(),
    unregister: jest.fn(),
    setValue,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

const setValue = jest.fn().mockImplementation(() => undefined);

describe('Multiselect', () => {
  it('should component in the document', () => {
    render();
    const component = screen.getByTestId(TEST_ID);
    expect(component).toBeInTheDocument();
  });
  it('should component send value when user click into checkbox', () => {
    render();
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(setValue.mock.calls[0]).toEqual([
      NAME,
      formatValues(getSelectedValues(TEST_OPTIONS)),
    ]);
    expect(setValue.mock.calls[1]).toEqual([NAME, []]);
  });
});
