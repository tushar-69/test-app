import AddPlayList from '@/app/components/addPlayList';
import { render, screen, fireEvent } from '@testing-library/react';
import { faker } from "@faker-js/faker";
import React from 'react';
import { playList } from '../../../__fixtures__/playlistResponse';
import '@testing-library/jest-dom';

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(playList)
  });

describe('Add PlayList', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    
    const setNameMock = jest.fn();
    const setMoviesMock = jest.fn();

    beforeEach(() => {
        jest
        .spyOn(React, "useState")
        .mockReturnValueOnce([faker.string.alphanumeric(), setNameMock])
        .mockReturnValueOnce([faker.helpers.multiple(() => faker.string.alphanumeric()), setMoviesMock])
    })

    it('should have link element for playlist', () => {
        render(<AddPlayList />);

        const element = screen.getByRole('link');
        expect(element).toBeInTheDocument();
    })

    it('should have button elements for submitting playlist & adding / removing movies', async () => {
        render(<AddPlayList />);

        const buttonAddElement = screen.getByTestId('btnAddMovie');
        expect(buttonAddElement).toBeInTheDocument();

        const buttonRemoveElement = screen.getByTestId('btnRemoveMovie-0');
        expect(buttonRemoveElement).toBeInTheDocument();

        const buttonSubmitElement = screen.getByTestId('btnSubmit');
        expect(buttonSubmitElement).toBeInTheDocument();
    })

    it("should have name & movie elements in the form", async () => {
        render(<AddPlayList />);

        const labelElement = screen.getByLabelText(/Name/i);
        expect(labelElement).toBeInTheDocument();

        const movieElements = screen.getAllByLabelText(/Movie/i);
        expect(movieElements.length).toBe(3);
    });

    it("should add a movie on click of add movie button", async () => {
        render(<AddPlayList />);

        const buttonElement = screen.getByTestId("btnAddMovie");
        fireEvent.click(buttonElement);
        expect(setMoviesMock).toHaveBeenCalled();

        const inputElement = await screen.getByTestId("txtMovie-1");
        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: faker.string.alphanumeric() } });
    });

    it("should remove a movie on click of remove movie button", async () => {
        render(<AddPlayList />);

        const buttonElement = await screen.getByTestId("btnRemoveMovie-0");
        fireEvent.click(buttonElement);
        expect(setMoviesMock).toHaveBeenCalled();
    });

    // it("should submit the form", async () => {
    //     const handleOnSubmitMock = jest.fn();

    //     const component = await AddPlayList();
    //     render(component);

    //     fireEvent.click(screen.getByTestId("formAddPlayList"));
    // });
})