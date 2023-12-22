import GridAction from '../../../app/components/gridAction';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IPlaylist from '@/app/playlist/iPlaylist';
import { faker } from "@faker-js/faker";
import { deletePlayList } from '../../../app/lib/api-service';

jest.mock('../../../app/lib/api-service', () => ({
    addPlayList: jest.fn()
}));

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    useSearchParams: jest.fn()
  }));

describe('Grid Action', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const playList: IPlaylist = {
        id: faker.string.alphanumeric(),
        name: faker.string.alphanumeric(), 
        movies: [faker.string.alphanumeric()]
    };
    
    (deletePlayList as jest.Mock);

    it('should have update & delete button', () => {
        const component = GridAction(playList);
        render(component);

        const elements = screen.getAllByRole('button');
        expect(elements.length).toBe(2);
    })
})