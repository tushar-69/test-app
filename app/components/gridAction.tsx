"use client"
import { deletePlayList } from '../lib/api-service';
import IPlaylist from 'app/playlist/iPlaylist';
import React from 'react'
import { useRouter } from 'next/router'

const GridAction = (playList: IPlaylist) => {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        await deletePlayList(id);
        alert('playlist deleted successfully');
    };

  return (
        <td>
            <button
                onClick={() => router.push(`/pages/updatePlaylist/${playList.id}`)}
                data-testid="btnUpdatePlayList"
                className="btn btn-info btn-sm"
                >
                Update
            </button>
            <button
                onClick={() => handleDelete(playList.id || '')}
                data-testid="btnDeletePlayList"
                className="btn btn-danger btn-sm"
                >
                Delete
            </button>
        </td>
  )
}

export default GridAction