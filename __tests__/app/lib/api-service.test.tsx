import { getPlayLists, getPlayListById, addPlayList, deletePlayList, updatePlayList } from "@/app/lib/api-service";
import { faker } from "@faker-js/faker";
import { playList, playLists } from "../../../__fixtures__/playlistResponse";

describe('API Service', () => {
    it('should fetch playlist successfully', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(playLists)
          });

        const data = await getPlayLists();
        expect(data).toEqual(playLists);
    })

    it('should fetch playlist by id successfully', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(playList)
          });

        const data = await getPlayListById(playList.id || faker.string.alphanumeric());
        expect(data).toEqual(playList);
    })

    it('should add playlist successfully', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(playList)
          });

        const data = await addPlayList(playList);
        expect(data).toEqual(playList);
    })

    it('should update playlist successfully', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve()
          });

        expect(await updatePlayList(playList)).resolves;
    })

    it('should delete playlist successfully', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve()
          });

        expect(await deletePlayList(faker.string.alphanumeric())).resolves;
    })
})