import PlayList from '../../../app/components/playList';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IPlaylist from '@/app/playlist/iPlaylist';
import { faker } from "@faker-js/faker";
import { getPlayLists } from '../../../app/lib/api-service';

jest.mock('../../../app/lib/api-service', () => ({
    getPlayLists: jest.fn()
}));

jest.mock("../../../app/components/gridAction", () => () => {
    return <td />;
});

describe('playlist', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const playLists: Array<IPlaylist> = [{ 
        id: faker.string.alphanumeric(),
        name: faker.string.alphanumeric(), 
        movies: [faker.string.alphanumeric()]
    },{ 
        id: faker.string.alphanumeric(),
        name: faker.string.alphanumeric(), 
        movies: [faker.string.alphanumeric()]
    }];

    (getPlayLists as jest.Mock).mockResolvedValue(playLists);

    it('should contain title playlist', async () => {
        const component = await PlayList();
        render(component);

        const element = screen.getByRole('heading');
        expect(element).toHaveTextContent('PlayList');
    })

    it('should contain table elements', async () => {
        const component = await PlayList();
        render(component);

        const tableElement = screen.getByRole('table');
        expect(tableElement).toBeInTheDocument();

        const tableHeader = screen.getByRole('thead');
        expect(tableHeader).toBeInTheDocument();

        const tableBody = screen.getByRole('tbody');
        expect(tableBody).toBeInTheDocument();

        const tableRows = screen.getAllByRole('tr');
        expect(tableRows.length).toBe(2);
    })
})