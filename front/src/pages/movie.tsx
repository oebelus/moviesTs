import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { initialData } from '../helpers/consts'

function Movie() {
    const [movieData, setMovieData] = useState<Movie>(initialData)
    const {title} = useParams()

    useEffect(() => {
        console.log("TITLE", title)
        if (title) {
            fetch(`http://www.omdbapi.com/?t=${title}&apikey=3244219b`)
                .then(response => response.json())
                .then(data => {
                    setMovieData(data);
                });
        }
    }, [title]);

    return (
        <div>
            <h2 className='relative text-yellow-600 text-2xl px-4 md:text-5xl mt-10 underline mb-10'>{movieData!.title}</h2>
            <div className='md:w-[85%] bg-[#191919] rounded-xl p-4 w-[90%] mx-auto'>
                <div className='md:flex gap-4'>
                    <div>
                        <div className="flex justify-center text-white gap-4 mb-2">
                            <p>{movieData!.type? movieData!.type[0].toUpperCase() + movieData!.type.slice(1, movieData!.type.length) : null}</p>
                            <p>{movieData!.released}</p>
                            <p>{movieData!.runtime}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className='rounded-xl' src={movieData!.poster} alt="" />
                            <div className="flex gap-2 mt-4">
                                {movieData!.genre ? movieData!.genre.split(', ').map((genre, key: number) => {
                                    return (
                                        <p className="border-1 text-white bg-[#00000050] rounded-xl px-2 w-fit h-fit" key={key}>{genre.includes('-') ? genre.split('-').join("") : genre}</p>
                                    )
                                }): null}
                            </div>
                                
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-white flex float-right mt-8 md:mt-1'>
                            {movieData!.imdbRating?
                            <div className='relative mx-auto text-white text-lg'>
                                <div className='flex gap-1'>
                                    <div className='mt-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-yellow-600 relative bottom-[2px]" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                    </div>
                                        <p>IMDb Rating</p>
                                </div>
                                <p>{movieData.imdbRating}/10</p>
                            </div>:null
                            }
                            {/*@todo Your rating <p>Your Rating:</p>*/}
                        </div>
                        <div className="text-[#ffffff94] mt-4 flex flex-col gap-6 md:my-auto">
                            <p><span className='text-white text-lg'>Director: </span>{movieData!.director}<hr/></p>
                            <p><span className='text-white text-lg'>Writer: </span>{movieData!.writer}<hr/></p>
                            <p><span className='text-white text-lg'>Actors: </span>{movieData!.actors}<hr/></p>
                            <p>{movieData!.plot}<hr/></p>
                            <p><span className='text-white text-lg'>Country: </span>{movieData!.country}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Movie