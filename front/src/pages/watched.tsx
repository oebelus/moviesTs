import { useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MovieOut from '../helpers/types'
import Movies from '../helpers/types';

export default function Watched() {
  const userId = localStorage.getItem("userId")
  const [loading, setLoading] = useState(true);
  const [watched, setWatched] = useState([])
  const [error, setError] = useState(null)

  const [moviesLength, setMoviesLength] = useState(0)
  const [seriesLength, setSeriesLength] = useState(0)

  const nav = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/watched/${userId}`)
    .then(response => {
      const data = response.data
      setWatched(data)
      setLoading(false)

    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      setError(error)
      setLoading(false)
  })}, [userId])

  useEffect(() => {
    const movies = watched.filter((show: Movies) => show.type === 'movie')
    setMoviesLength(movies.length)

    const series = watched.filter((show: Movies) => show.type === 'series')
    setSeriesLength(series.length)
  }, [watched])

  const deleteWatched = (index: number) => {
    console.log(watched)
    const movieToDelete: MovieOut = watched[index]
    
    axios.delete(`http://localhost:8000/watched/${userId}/${movieToDelete._id}`)
    .then((response) => {
      console.log(response)
      const updatedWatched = watched.filter((_, i) => i !== index);
      setWatched(updatedWatched);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const imageClick = (title: string) => {
    nav(`/movie/${title}`)
  }

  return (
    <div>
      <h1 className='text-[#9e7106] md:text-6xl text-3xl -mb-10 md:mb-1 mt-6'>Watched</h1>
      <div>
        <div className='watched-stats'>
          <p className='font-white md:mt-10'>You watched {moviesLength} movies and {seriesLength} series</p>
        </div>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-20 md:mt-10">
          {watched.map((movie: MovieOut, index) => 
            <div className='relative bg-[#191919] py-5 px-4 flex flex-col' key={index}>
              <p onClick={() => deleteWatched(index)} className="absolute top-2 left-2 text-white cursor-pointer text-xl font-bold">x</p>
              <img onClick={() => imageClick(movie.title)} className='w-42 h-72 mx-auto object-cover cursor-pointer' src={movie.poster} alt='poster'/>
              <h3 className="text-white mt-4 mb-4">{movie.title}</h3>
              <div className="-mb-6 flex justify-between items-center text-[#c7c8c9] gap-2">
                <p className="text-sm">{movie.runtime}</p>
                <p className="text-sm border border-white/40 py-1 px-2">{movie.type[0].toUpperCase() + movie.type.slice(1, movie.type.length)}</p>
              </div>
            </div>
          )}
        </div>
        </div>
      {loading}{error}
    </div>
  )
}
