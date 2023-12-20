import UpdatePlayList from 'app/components/updatePlayList';
import { getPlayListById } from 'app/lib/api-service'

export default async function Update({ params }: { params: { id: string } }) {
  const playlist = await getPlayListById(params.id);
  return (
    <UpdatePlayList id={playlist.id} name={playlist.name} movies={playlist.movies} />
  )
}