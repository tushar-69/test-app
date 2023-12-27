"use client";
import { useState } from "react";
import IPlaylist from "../playlist/iPlaylist";
import { updatePlayList } from "../lib/api-service";
import Link from "next/link";

export default function UpdatePlayList(props: IPlaylist) {
    const [name, setName] = useState(props.name);
    const [movies, setMovies] = useState<Array<string>>(props.movies);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await updatePlayList({ id: props.id, name: name, movies: movies });
        alert('Playlist updated successfully');
    }

    const handleChange = (e: any, i: number)=>{
        const {value}=e.target
        const updatedMovies = [...movies]
        updatedMovies[i]=value
        setMovies(updatedMovies)
    }

    const handleRemoveMovie = (index: number) => {
        const deleteVal = [...movies]
        deleteVal.splice(index,1)
        setMovies(deleteVal)
    }

    const handleAddMovie = () => {
        setMovies([...movies, '']);
    }

    return(
        <>
        <Link href={'/'}>PlayList</Link>
        <form data-testid="formUpdatePlayList" onSubmit={(e) => handleSubmit(e)}>
            <label>Name : 
                <input
                    data-testid="txtName"
                    type="text"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            {movies.map((movie, index) => (
                <div key={index}>
                    <label>Movie : 
                        <input
                            data-testid={`txtMovie-${index}`}
                            type="text"
                            name="movie"
                            value={movie}
                            onChange={(e)=>handleChange(e,index)}
                        />
                    </label>
                    <button data-testid={`btnRemoveMovie-${index}`} type="button" onClick={() => handleRemoveMovie(index)}>
                        Remove Movie
                    </button>
                </div>
            ))}

            <button data-testid="btnAddMovie" type="button" onClick={() => handleAddMovie()}>
                Add Movie
            </button>

            <button data-testid="btnSubmit" type="submit">Submit</button>
        </form>
        </>
    )
}