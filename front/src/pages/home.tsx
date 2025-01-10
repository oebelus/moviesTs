import { useState, useEffect } from 'react'
import axios from 'axios'
import { initialData } from '../helpers/consts'
import { EyeIcon, PlusIcon, StarIcon } from '@heroicons/react/16/solid';
import { toast } from 'react-toastify';

interface HomeProps {
    isAuthenticated: boolean | null,
    userId: string | null,
}

interface Movies {
    id: number;
    Title: string;
    Year: string;
    Runtime: string;
    Type: string;
    Poster: string;
    Released: string;
    imdbRating: string;
    Genre: string;
    Actors: string;
    Writer: string;
    Director: string;
    Plot: string;
    Country: string;
}

export default function Home({isAuthenticated}: HomeProps) {
    const [shows, setShows] = useState<Movies[]>()
    const [input, setInput] = useState("")
    const [display, setDisplay] = useState(false)
    const [movieName, setMovieName] = useState("")
    const [movieData, setMovieData] = useState<Movies>(initialData)
    const postMovie = {
        title: movieData.Title,
        year: movieData.Year,
        runtime: movieData.Runtime,
        type: movieData.Type,
        poster: movieData.Poster,
    }
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        if (movieName) {
            fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=3244219b`)
                .then(response => response.json())
                .then(data => {
                    setMovieData(data);
                });
        }
    }, [movieName, userId]);

    const fetchMovies = (query: string) => {
        fetch(`http://www.omdbapi.com/?s=${query}&apikey=3244219b`)
            .then(response => response.json())
            .then(data => {
                if (data.Search) {
                    const lastFiveMovies = data.Search.slice(-10);
                    setShows(lastFiveMovies);
                }
            });
    };

    const addWatched =  async () => {
        try {
            await axios.post(`http://localhost:8000/watched/${userId}`, postMovie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                toast.success("Movie added successfully to Watched")
            })
        } catch (err) {
            toast.error("Movie already exists in Watched")
            console.log(err)
        }
    }

    const addWatchlist =  async () => {
        try {
            await axios.post(`http://localhost:8000/watchlist/${userId}`, postMovie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                toast.success("Movie added successfully to Watchlist")
            })
        } catch (err) {
            toast.error("Movie already exists in Watchlist")
            console.log(err)
        }
    }

    const addTop =  async () => {
        try {
            await axios.post(`http://localhost:8000/top/${userId}`, postMovie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                toast.success('Movie added successfully to Top 100')
            })
        } catch (err) {
            toast.error("Movie already exists in Top 100")
            console.log(err)
        }
    }
    

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInput(query);
        fetchMovies(query);
        setDisplay(false);
    }

  return (
    <div>
        <div className="mt-20">
            <h1 className='text-yellow-600 text-2xl md:text-4xl'>Find Movies, TV shows and more...</h1>
            <input className='w-[90%] text-xl h-14 mt-16 rounded-lg px-4 bg-zinc-800 text-white mb-2' type="text" onChange={handleInput} name="findMovie" value={display?movieName:undefined} placeholder='Find a Show' id="" />
            {shows && input && shows.length > 0 && display === false?
                <div className='flex flex-col gap-2 w-88 bg-black bg-opacity-50 rounded-lg p-2 mt-2 overflow-y-scroll max-h-[450px]'>
                    {shows.map((show, index) => (
                        <div 
                            key={index} 
                            className='flex gap-4 cursor-pointer bg-card hover:bg-zinc-800 transition-all duration-300 p-2 items-center rounded-md border-borderGray border-2 text-white' 
                            onClick={() => {setMovieName(show.Title); setDisplay(true)}}
                        >
                            <img src={show.Poster ? show.Poster : undefined} width="60px" height="80px" alt="" />
                            <div>
                                <h4 className='text-left'>{show.Title}</h4>
                                <div className="flex gap-2">
                                    <p>{show.Year}</p>
                                    <p>-</p>
                                    <p>{show.Type? show.Type[0].toUpperCase() + show.Type.slice(1, show.Type.length) : null}</p>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div> 
                : 
                (display?
                <div className='m-auto bg-container rounded-md p-4 mt-4 mb-4 border-2 border-zinc-900 md:w-[80%] lg:w-[80%] w-[95%]'>
                    <h2 className='text-yellow-600 text-3xl mb-4'>{movieData.Title}</h2>
                    <div className='md:px-8 px-2 md:flex sm:flex-row gap-4 md:justify-between flex-col justify-center'>
                        <div className='flex flex-col md:mt-20'>
                            <div className="flex gap-4 text-white justify-center mb-2">
                                <p className=''>{movieData.Type? movieData.Type[0].toUpperCase() + movieData.Type.slice(1, movieData.Type.length) : null},</p>
                                <p className='year'>{movieData.Released},</p>
                                <p className='runtime'>{movieData.Runtime}</p>
                            </div>
                            <div className='flex flex-col'>
                                <img src={movieData.Poster} alt="" />
                                <div className="flex gap-2 mt-4 mb-4 justify-center">
                                    {movieData.Genre ? movieData.Genre.split(', ').map((genre, key: number) => {
                                        return (
                                            <p className="text-white border-zinc-600 border-1 p-2 rounded-lg bg-zinc-900" key={key}>{genre}</p>
                                        )
                                    }): null}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 text-lg">
                            {movieData.imdbRating ? (
                                <div className="md:text-right relative text-white text-lg">
                                    <div className="flex gap-1 md:justify-end justify-center">
                                        <div className="mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                        </div>
                                        <p>IMDb Rating</p>
                                    </div>
                                    <p>{movieData.imdbRating}/10</p>
                                </div>
                            ) : null}
                            <div className='text-white text-lg flex flex-col gap-8 sm:mx-24 mx-8'>
                                <p><span className='text-zinc-400'>Director: </span>{movieData.Director == "N/A" ? movieData.Writer : movieData.Director}<hr className='mt-2' /></p>
                                <p><span className='text-zinc-400'>Writer: </span>{movieData.Writer}<hr className='mt-2' /></p>
                                <p><span className='text-zinc-400'>Actors: </span>{movieData.Actors}<hr className='mt-2' /></p>
                                <p>{movieData.Plot}<hr className='mt-2'/></p>
                                <p><span className='text-zinc-400'>Country: </span>{movieData.Country}</p>
                            </div>
                        </div>
                    </div>
                    {userId !== null &&
                    <div className="flex gap-4 justify-center mt-4">
                        <button title='Add to Watched' onClick={addWatched} className="hover:bg-yellow-600 transition-all duration-300 p-2 text-white w-20 border-2 border-yellow-600 rounded-full">
                            <EyeIcon/>
                        </button>
                        <button title='Add to Watchlist' onClick={addWatchlist} className="hover:bg-yellow-600 transition-all duration-300 p-2 text-white w-20 border-2 border-yellow-600 rounded-full">
                            <PlusIcon/>
                        </button>
                        <button title='Add to Top 100' onClick={addTop} className="hover:bg-yellow-600 transition-all duration-300 p-2 text-white w-20 border-2 border-yellow-600 rounded-full">
                            <StarIcon/>
                        </button>
                    </div>
                    }
                </div>
            : null)
            }
        </div>
        {isAuthenticated}
    </div>
  )
}