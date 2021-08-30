import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../Home';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom'

describe('Home Component Tests', () => {
    it('Should create and validate challenge', async () => { //integration test
        const history = createMemoryHistory();
        const state = { user: {name: 'Nyra', id: 'E2020250'} }; // change state to set the user info
        history.replace({ ...history.location, state });
        render(
            <Router history={history}>
              <Home />
            </Router>,
        );

        const createBtn = screen.getByTitle(/Create Challenge/i);
        fireEvent.click(createBtn);
        await waitFor(() => screen.getByTestId('modal'));

        // enter input
        const title = screen.getByTitle('Enter Title');
        fireEvent.change(title, { target: { value: 'New Test Challenge' }});
        const desc = screen.getByTitle('Enter Description');
        fireEvent.change(desc, { target: { value: 'This is just a test challenge created through test' }});
        const tags = screen.getByTitle('Enter Tags');
        fireEvent.change(tags, { target: { value: 'test' }});

        fireEvent.click(screen.getByTitle('Save Challenge'));
        const challenge = await waitFor(() => screen.getAllByText(/New Test Challenge/i));
        expect(challenge[0]).toBeInTheDocument();
    });
});