import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../Header';

describe('Header Component Tests', () => {
  it('Check Header Text', () => {
    render(<Header user="Saran"/>);
    const headingElement = screen.getByText(/hello, saran/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('Check Header Buttons', () => {
    render(<Header user="Saran"/>);
    const createBtn = screen.getByTitle(/Create Challenge/i);
    expect(createBtn).toBeInTheDocument();

    const logoutBtn = screen.getByTitle(/Logout/i);
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Check Create Portal Modal Loads', async () => {
    render(<Header user="Saran"/>);
    const createBtn = screen.getByTitle(/Create Challenge/i);
    fireEvent.click(createBtn);
    await waitFor(() => screen.getByTestId('modal'));
    expect(screen.getByTestId('modal-header')).toHaveTextContent('Create Challange');
  });
});
