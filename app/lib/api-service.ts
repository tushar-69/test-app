import { apiEndPoint } from "app/constants/constants";
import IPlaylist from "app/playlist/iPlaylist";

export const getPlayLists = async () => {
    const res = await fetch(apiEndPoint, { cache: 'no-store' });
    return res.json();
};

export const getPlayListById = async (id: string) => {
    const res = await fetch(`${apiEndPoint}/${id}`, { cache: 'no-store' });
    return res.json();
};

export const addPlayList = async (playList: IPlaylist) => {
    const response = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(playList)
    })
    return await response.json();
}

export const updatePlayList = async (playList: IPlaylist) => {
    await fetch(apiEndPoint, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(playList)
    })
}

export const deletePlayList = async(id: string) => {
    await fetch(`${apiEndPoint}/${id}`, { method: "DELETE" })
}