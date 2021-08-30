import { render, screen } from '@testing-library/react';
import CreateModal from '../CreateModal';

describe('CreateModal Component Tests', () => {
    it('Check Modal Loaded', () => {
        const openModal = true;
        render(<CreateModal open={openModal}/>);
        const modalWindow = screen.getByTestId('modal');
        expect(modalWindow).toBeInTheDocument();
    });

    it('Check Modal Inputs', () => {
        const openModal = true;
        render(<CreateModal open={openModal}/>);
        const textInputs = screen.getAllByRole('textbox');
        expect(textInputs.length).toBe(3);
    });

    it('Check Modal Action Buttons', () => {
        const openModal = true;
        render(<CreateModal open={openModal}/>);
        const actionBtns = screen.getAllByRole('button');
        expect(actionBtns.length).toBe(2);
    });
});