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
    axios.delete(`http://localhost:8000/top/${userId}/${movieToDelete._id}`)
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
        <form onSubmit={findUser} className="md:absolute right-10 top-1 p-3 flex gap-2 md:w-1/3 md:p-4">
          <input onChange={handleChange} value={search} className="w-full h-10 pl-5 pr-3 text-white bg-zinc-900 rounded-xl text-lg border border-white/30" type="search" placeholder="Find a User's Top 100" aria-label="Search"/>
          <button type='submit' className='w-10 h-10 rounded-2xl text-center bg-[#9e7106] hover:bg-[#ba8300] border border-[#9e7106] transition'>
            <div className='relative left-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
          </button>
        </form>
        <div className="flex flex-col">
          <h1 className="text-[#9e7106] md:text-6xl text-3xl mt-6 mb-2">
            {otherUsername 
              ? otherUsername === username 
                ? "My Top 100 Movies" 
                : `${otherUsername[0].toUpperCase() + otherUsername.slice(1)}'s Top 100 Movies`
              : "My Top 100 Movies"
            }
          </h1>
          <div className="px-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
            {top.map((movie: Movies, index: number) => 
              <div className="relative bg-[#191919] py-5 px-4 flex flex-col" key={index}>
                {isUser && <p onClick={() => deleteTop(index)} className="absolute top-2 left-2 text-white cursor-pointer text-xl font-bold">x</p>}
                <img onClick={() => imageClick(movie.title)} className="w-42 h-72 mx-auto object-cover cursor-pointer" src={movie.poster} alt="poster"/>
                <h3 className="text-white mt-4 mb-4">{movie.title}</h3>
                <div className="-mb-6 flex justify-between items-center text-[#c7c8c9] gap-2">
                  <p className="text-sm">{movie.runtime}</p>
                  <p className="text-sm border border-white/40 py-1 px-2">{movie.type[0].toUpperCase() + movie.type.slice(1)}</p>
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
