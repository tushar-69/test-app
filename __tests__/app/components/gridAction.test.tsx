import GridAction from '../../../app/components/gridAction';
import { fireEvent, render, screen } from '@testing-library/react';
import { deletePlayList } from '../../../app/lib/api-service';
import { useRouter } from 'next/router';
import { apiEndPoint } from '@/app/constants/constants';
import { playList } from '../../../__fixtures__/playlistResponse';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve()
  });

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
  }));

describe('Grid Action', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    
    it('should have update & delete button', () => {
        const component = GridAction(playList);
        render(component);

        const updateButtonElement = screen.getByTestId('btnUpdatePlayList');
        expect(updateButtonElement).toBeInTheDocument();

        const deleteButtonElement = screen.getByTestId('btnDeletePlayList');
        expect(deleteButtonElement).toBeInTheDocument();
    })

    it('should update the playlist', async () => {
        const mockRouter = {
            push: jest.fn()
          };
      
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        const component = GridAction(playList);
        render(component);

        const buttonElement = screen.getByRole("button", { name: /Update/i} );
        fireEvent.click(buttonElement);
        expect(mockRouter.push).toHaveBeenCalledTimes(1);
    })

    it('should delete the playlist', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        const component = GridAction(playList);
        render(component);

        const buttonElement = screen.getByRole("button", { name: /Delete/i} );
        fireEvent.click(buttonElement);
        expect(await deletePlayList(faker.string.alphanumeric())).resolves;
    })
})