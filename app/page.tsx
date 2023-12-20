import Link from "next/link";
import PlayList from "./components/playList";

export default function Home() {
  return (
    <>
      <Link href={'/pages/addPlaylist'}>Add PlayList</Link>
      <PlayList />
    </>
  )
}
