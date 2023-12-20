import GridAction from "app/components/gridAction";
import { getPlayLists } from "app/lib/api-service";
import IPlaylist from "app/playlist/iPlaylist";

export default async function PlayList () {
    let playLists: Array<IPlaylist> = await getPlayLists();

    if (playLists.length === 0) return <h2> there are no playlist in the Database </h2>;
    return (
      <>
      <h2 data-test-id="title">PlayList</h2>
        <div className="container">
          <table className="table">
            <thead><tr><th>Title</th><th>Movies</th><th>Update / Delete</th></tr></thead>
            <tbody>
              {playLists?.map((post) => (
                <tr key={post.id}>
                  <td > {post.name} </td>
                  <td>{post.movies.map((movie, i) => (
                    <li key={i}>{movie}</li>
                  ))}</td>
                  <GridAction id={post.id} name={post.name} movies={post.movies} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
}