import UpdatePlayList from '../../../app/components/updatePlayList';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from "@faker-js/faker";
import React from 'react';
import { playList } from '../../../__fixtures__/playlistResponse';

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve()
  });

describe('Update PlayList', () => {
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

    it('should have link element for playlist', async () => {
        const component = await UpdatePlayList(playList);
        render(component);

        const element = screen.getByRole('link');
        expect(element).toBeInTheDocument();
    })

    it('should have button elements for submitting playlist & adding / removing movies', async () => {
        const component = await UpdatePlayList(playList);
        render(component);

        const buttonAddElement = screen.getByTestId('btnAddMovie');
        expect(buttonAddElement).toBeInTheDocument();

        const buttonRemoveElement = screen.getByTestId('btnRemoveMovie-0');
        expect(buttonRemoveElement).toBeInTheDocument();

        const buttonSubmitElement = screen.getByTestId('btnSubmit');
        expect(buttonSubmitElement).toBeInTheDocument();
    })

    it("should add a movie on click of add movie button", async () => {
        const component = await UpdatePlayList(playList);
        render(component);

        const buttonElement = screen.getByTestId("btnAddMovie");
        fireEvent.click(buttonElement);
        expect(setMoviesMock).toHaveBeenCalled();

        const inputElement = await screen.getByTestId("txtMovie-1");
        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: faker.string.alphanumeric() } });
    });

    it("should remove a movie on click of remove movie button", async () => {
        const component = await UpdatePlayList(playList);
        render(component);

        const buttonElement = await screen.getByTestId("btnRemoveMovie-0");
        fireEvent.click(buttonElement);
        expect(setMoviesMock).toHaveBeenCalled();
    });
})