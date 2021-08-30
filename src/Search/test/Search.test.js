import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

describe('Search Component Tests', () => {
    it('Should render input element', () => {
        render(<Search/>);
        const inputEl = screen.getByPlaceholderText(/Search Challenges/i);
        expect(inputEl).toBeInTheDocument();
    });

    it('Should be able to type in search box', () => {
        render(<Search/>);
        const inputEl = screen.getByPlaceholderText(/Search Challenges/i);
        fireEvent.change(inputEl, { target: { value: 'New challenge' }});
        expect(inputEl.value).toBe('New challenge');
    });
});
