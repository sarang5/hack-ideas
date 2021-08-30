import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';

describe('Login Component Tests', () => {

    it('Should load login content', () => {
        render(<Login/>);
        const inputEl = screen.getByPlaceholderText(/Enter Employee ID/i);
        expect(inputEl).toBeInTheDocument();
    });

    it('Should show login error for invalid input', async () => {
        render(<Login/>);
        const inputEl = screen.getByPlaceholderText(/Enter Employee ID/i);
        fireEvent.change(inputEl, { target: { value: 'test' }});
        fireEvent.click(screen.getByRole('button'));
        const error = await waitFor(() => screen.getByText(/Invalid employee ID!/i));
        expect(error).toBeInTheDocument();
    });

    it('Should login and navigate to home page', async () => {
        render(<Login/>);
        const inputEl = screen.getByPlaceholderText(/Enter Employee ID/i);
        fireEvent.change(inputEl, { target: { value: 'E2018101' }});
        fireEvent.click(screen.getByRole('button'));
        // TODO: Need to add test to check for navigation happened successfully.
    });
});