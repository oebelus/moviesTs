import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MovieOut from '../helpers/types';

export default function Watchlist() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [watchlist, setwatchlist] = useState([])
  const [error, setError] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/watchlist/${userId}`)
    .then(response => {
      console.log(response.data)
      const data = response.data
      setwatchlist(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      setError(error)
      setLoading(false)
  })}, [userId])

  const deleteWatchlist = (index: number) => {
    const movieToDelete: MovieOut = watchlist[index]
    
    axios.delete(`http://localhost:8000/watchlist/${userId}/${movieToDelete._id}`)
    .then((response) => {
      console.log(response)
      const updatedwatchlist = watchlist.filter((_, i) => i !== index);
      setwatchlist(updatedwatchlist);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const imageClick = (title: string) => {
    console.log(title)
    nav(`/movie/${title}`)
  }

  return (
    <div>
      <div>
        <h1 className='text-[#9e7106] md:text-6xl text-3xl mt-6 mb-2'>My Watchlist</h1>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
          {watchlist.map((movie: MovieOut, index) => 
            <div className='relative bg-[#191919] py-5 px-4 flex flex-col' key={index}>
              <p onClick={() => deleteWatchlist(index)} className="absolute top-2 left-2 text-white cursor-pointer text-xl font-bold">x</p>
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
