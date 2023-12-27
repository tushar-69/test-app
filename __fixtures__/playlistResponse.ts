
import { faker } from '@faker-js/faker';
import IPlaylist from '../app/playlist/iPlaylist'

export const playList: IPlaylist = { 
    id: faker.string.alphanumeric(),
    name: faker.string.alphanumeric(), 
    movies: faker.helpers.multiple(() => faker.string.alphanumeric())
};

export const playLists: Array<IPlaylist> = [
    { 
        id: faker.string.alphanumeric(),
        name: faker.string.alphanumeric(), 
        movies: faker.helpers.multiple(() => faker.string.alphanumeric())
    },
    {
        id: faker.string.alphanumeric(),
        name: faker.string.alphanumeric(), 
        movies: faker.helpers.multiple(() => faker.string.alphanumeric())
    }   
]