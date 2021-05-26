import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';
import AddNetworkForm from './CreateNetwork';
import { setOne } from '../../store/slice';

jest.mock('../../store/slice', () => {
  return {
    setOne: jest.fn(),
  };
});

const render = () => {
  renderWithProviders(<AddNetworkForm />);
  const networkName = screen.getByPlaceholderText(/name of network/i);
  const email = screen.getByPlaceholderText(/email/i);
  const description = screen.getByPlaceholderText(
    /a few word about this network/i,
  );
  const button = screen.getByText(/submit/i);

  return {
    networkName,
    description,
    email,
    button,
  };
};
describe('Add network form', () => {
  it('should component in the document', () => {
    const { networkName, email, description } = render();

    expect(networkName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should form send valid data', async () => {
    const testData = {
      title: 'test network name',
      email: 'test@test.com',
      description:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    };
    const { networkName, email, description, button } = render();

    fireEvent.change(networkName, { target: { value: testData.title } });
    fireEvent.change(email, { target: { value: testData.email } });
    fireEvent.change(description, { target: { value: testData.description } });

    await waitFor(() => {
      fireEvent.click(button);
      expect(setOne).toHaveBeenCalledTimes(1);
      expect(setOne).toHaveBeenCalledWith(testData);
    });
  });
});
