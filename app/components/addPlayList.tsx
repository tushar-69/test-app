"use client";
import { useState } from "react";
import { addPlayList } from '../lib/api-service';
import Link from "next/link";

export default function AddPlayList() {
    const [name, setName] = useState('');
    const [movies, setMovies] = useState<Array<string>>(['']);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = await addPlayList({name: name, movies: movies});
        if (data?.id) {
            alert('Playlist added successfully');
        } else {
            alert('Failed to add playlist');
        }
    }

    const handleChange = (e: any, i: number) => {
        const {value}=e.target
        const onchangeVal = [...movies]
        onchangeVal[i]=value
        setMovies(onchangeVal)
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
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Name : 
                <input
                    type="text"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            {movies.map((movie, index) => (
                <div className="form-inline" key={index}>
                    <label>Movie : 
                        <input
                            type="text"
                            name="movie"
                            value={movie}
                            onChange={(e)=>handleChange(e,index)}
                            placeholder="Add a new movie here..."
                        />
                    </label>
                    <button type="button" onClick={() => handleRemoveMovie(index)}>
                        Remove Movie
                    </button>
                </div>
            ))}

            <button type="button" onClick={() => handleAddMovie()}>
                Add Movie
            </button>

            <button type="submit">Submit</button>
        </form>
        </>
    )
}