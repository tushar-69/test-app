import AddPlayList from '@/app/components/addPlayList';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IPlaylist from '@/app/playlist/iPlaylist';
import { faker } from "@faker-js/faker";
import { addPlayList } from '../../../app/lib/api-service';
import React from 'react';

    
jest.mock('../../../app/lib/api-service', () => ({
    addPlayList: jest.fn()
}));

describe('Add PlayList', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const playList: IPlaylist = { 
        id: faker.string.alphanumeric(),
        name: faker.string.alphanumeric(), 
        movies: [faker.string.alphanumeric()]
    };
    
    (addPlayList as jest.Mock).mockResolvedValue(playList);

    const setStateMock = jest.fn();

    beforeEach(() => {
        jest
        .spyOn(React, "useState")
        .mockReturnValueOnce([faker.string.alphanumeric(), setStateMock])
        .mockReturnValueOnce([[faker.string.alphanumeric(), faker.string.alphanumeric()], setStateMock])
    })

    it('should have link element for playlist', async () => {
        const component = await AddPlayList();
        render(component);

        const element = screen.getByRole('link');
        expect(element).toBeInTheDocument();
    })

    it('should have button elements for submitting playlist & adding / removing movies', async () => {
        const component = await AddPlayList();
        render(component);

        const elements = screen.getAllByRole('button');
        expect(elements.length).toBeGreaterThanOrEqual(3);
    })

    it("should have name & movie elements in the form", async () => {
        const component = await AddPlayList();
        render(component);

        const labelElement = screen.getByLabelText(/Name/i);
        expect(labelElement).toBeInTheDocument();

        const movieElements = screen.getAllByLabelText(/Movie/i);
        expect(movieElements.length).toBeGreaterThanOrEqual(1);
    });

    it("should add a movie on click of add movie button", async () => {
        const component = await AddPlayList();
        render(component);

        const inputElements = await screen.findAllByPlaceholderText(/Add a new movie here.../i);
        fireEvent.click(inputElements[inputElements.length - 1])
        fireEvent.change(inputElements[inputElements.length - 1], { target: { value: faker.string.alphanumeric() } });

        const buttonElement = screen.getByRole("button", { name: /Add Movie/i} );
        fireEvent.click(buttonElement);
        expect(setStateMock).toHaveBeenCalled();
    });

    it("should remove a movie on click of remove movie button", async () => {
        const component = await AddPlayList();
        render(component);

        const buttonElements = await screen.findAllByRole("button", { name: /Remove Movie/i} );
        fireEvent.click(buttonElements[0]);
        expect(setStateMock).toHaveBeenCalled();
    });

})