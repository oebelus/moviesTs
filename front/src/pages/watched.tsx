import { useEffect , useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import MovieOut from '../helpers/types'
import Movies from '../helpers/types';

export default function Watched() {
  const { userId } = useParams();
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
      const movies = watched.filter((show: Movies) => show.type === 'movie')
      setMoviesLength(movies.length)

      const series = watched.filter((show: Movies) => show.type === 'series')
      setSeriesLength(series.length)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      setError(error)
      setLoading(false)
  })}, [userId, watched])

  const deleteWatched = (index: number) => {
    const movieToDelete: MovieOut = watched[index]
    console.log(movieToDelete.id)
    axios.delete(`http://localhost:8000/watched/${userId}/${movieToDelete.id}`)
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
    <div className='watched-page'>
      <h1 className='watched-title'>Watched</h1>
      <div className="">
        <div className='watched-stats'>
          <p className='font-white'>You watched {moviesLength} movies and {seriesLength} series</p>
        </div>
        <div className='watched-container'>
        {watched.map((movie: MovieOut, index) => 
          <div className='watched-movies' key={index}>
            <p onClick={() => deleteWatched(index)} className="watched-cross">x</p>
            <img onClick={() => imageClick(movie.title)} className='single-poster' src={movie.poster} alt='poster'/>
            <h3 className="single-title">{movie.title}</h3>
            <div className="single-small">
              <div className="single-left">
                <p className="single-runtime">'{movie.runtime}</p>
              </div>
              <div className="single-right">
                <p className="single-type">{movie.type[0].toUpperCase() + movie.type.slice(1, movie.type.length)}</p>
              </div>
            </div>
          </div>
        )}
        </div>
        </div>
      {loading}{error}
    </div>
  )
}