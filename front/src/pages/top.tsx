import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Movies from '../helpers/types'

interface TopProps {
  username: string | null
}

export default function Top({username}: TopProps) {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState<Movies[]>([])
  const [error, setError] = useState(null)
  const [theId, setTheId] = useState(null);
  const [search, setSearch] = useState("")
  const [isUser, setIsUser] = useState(true)
  const [otherUsername, setOtherUsername] = useState<string|null>(null)
  username = localStorage.getItem("username")

  const nav = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/top/${userId}`)
    .then(response => {
      const data = response.data
      setTop(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      setError(error)
      setLoading(false)
  })}, [userId, isUser])

  const deleteTop = (index: number) => {
    const movieToDelete: Movies = top[index]
    axios.delete(`http://localhost:8000/top/${userId}/${movieToDelete.id}`)
    .then(() => {
      const updatedtop = top.filter((_, i) => i !== index);
      setTop(updatedtop);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const imageClick = (title: string) => {
    nav(`/movie/${title}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearch(query)
  }

  const findUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.get('http://localhost:8000/users/')
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].username === search) {
            setTheId(response.data[i].id)
            nav(`/${response.data[i].id}/top`)
            setIsUser(false)
            setOtherUsername(response.data[i].username)
            console.log("other username", otherUsername)
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div>
    <div>
      <form onSubmit={findUser} className="find-user-div form-inline my-2 my-lg-0">
        <input onChange={handleChange} value={search} className="find-user" type="search" placeholder="Find a User's Top 100" aria-label="Search"/>
        <button type='submit' className='find-user-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </form>
      <div className='watched-page'>
        <h1 className='watched-title top-title'>{otherUsername ? otherUsername === username ? "My Top 100 Movies":`${otherUsername[0].toUpperCase() + otherUsername.slice(1, otherUsername.length)}'s Top 100 Movies`:"My Top 100 Movies"}</h1>
        <div className="watched-container">
          {top.map((movie: Movies, index: number) => 
            <div className='watched-movies' key={index}>
              {isUser ? <p onClick={() => deleteTop(index)} className="watched-cross">x</p> : null}
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
    </div>
    <p>{loading}{theId}{error}</p>
    </div>
  )
}