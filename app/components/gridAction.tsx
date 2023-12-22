"use client"
import { deletePlayList } from '../lib/api-service';
import IPlaylist from 'app/playlist/iPlaylist';
import React from 'react'
import { useRouter } from 'next/navigation'

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
                data-test-id="btnUpdatePlayList"
                className="btn btn-info btn-sm"
                >
                Update
            </button>
            <button
                onClick={() => handleDelete(playList.id || '')}
                data-test-id="btnDeletePlayList"
                className="btn btn-danger btn-sm"
                >
                Delete
            </button>
        </td>
  )
}

export default GridAction