import PlayList from '../../../app/components/playList';
import { render, screen } from '@testing-library/react';
import { playLists } from '../../../__fixtures__/playlistResponse';
import '@testing-library/jest-dom';

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(playLists)
  });

jest.mock("../../../app/components/gridAction", () => () => {
    return <td />;
});

describe('playlist', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should contain title playlist', async () => {
        const component = await PlayList();
        render(component);

        const element = screen.getByRole('heading');
        expect(element).toHaveTextContent('PlayList');
    })

    it('should contain table elements', async () => {
        const component = await PlayList();
        render(component);

        const tableElement = screen.getByTestId('tblPlaylist');
        expect(tableElement).toBeInTheDocument();

        const tableHeader = screen.getByRole('thead');
        expect(tableHeader).toBeInTheDocument();

        const tableBody = screen.getByRole('tbody');
        expect(tableBody).toBeInTheDocument();

        const tableRows = screen.getAllByRole('tr');
        expect(tableRows.length).toBe(2);
    })
})