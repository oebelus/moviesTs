import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

interface MovieListProps {
  username: string | null;
}

interface User {
  id: string;
  username: string;
}

export default function MovieList({ username }: MovieListProps) {
  const location = useLocation();
  const nav = useNavigate();
  const { userId } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [moviesLength, setMoviesLength] = useState(0);
  const [seriesLength, setSeriesLength] = useState(0);
  const [search, setSearch] = useState("");
  const [isUser, setIsUser] = useState(true);
  const [otherUsername, setOtherUsername] = useState<string|null>(null);

  const pageType = location.pathname.split('/')[1]; // 'watched', 'watchlist', or 'top'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/${pageType}/${userId || currentUserId}`);
        setMovies(response.data);
        setLoading(false);

        if (pageType === 'watched') {
          const movieCount = response.data.filter((show: Movie) => show.type === 'movie').length;
          const seriesCount = response.data.filter((show: Movie) => show.type === 'series').length;
          setMoviesLength(movieCount);
          setSeriesLength(seriesCount);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, [pageType, userId, currentUserId, isUser]);

  const deleteItem = async (index: number) => {
    const movieToDelete: Movie = movies[index];
    try {
      await axios.delete(`http://localhost:8000/${pageType}/${userId || currentUserId}/${movieToDelete._id}`);
      const updatedMovies = movies.filter((_, i) => i !== index);
      setMovies(updatedMovies);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error deleting item';
      setError(errorMessage);
    }
  };

  const imageClick = (title: string) => {
    nav(`/movie/${title}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const findUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/users/');
      const user = response.data.find((user: User) => user.username === search);
      if (user) {
        nav(`/top`);
        setIsUser(false);
        setOtherUsername(user.username);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error finding user';
      setError(errorMessage);
    }
  };

  const getPageTitle = () => {
    switch (pageType) {
      case 'watched':
        return 'Watched';
      case 'watchlist':
        return 'My Watchlist';
      case 'top':
        return otherUsername 
          ? otherUsername === username 
            ? "My Top 100 Movies" 
            : `${otherUsername[0].toUpperCase() + otherUsername.slice(1)}'s Top 100 Movies`
          : "My Top 100 Movies";
      default:
        return '';
    }
  };

  return (
    <div>
      {pageType === 'top' && (
        <form onSubmit={findUser} className="md:absolute right-10 top-1 p-3 flex gap-2 md:w-1/3 md:p-4">
          <input 
            onChange={handleChange} 
            value={search} 
            className="w-full h-10 pl-5 pr-3 text-white bg-zinc-900 rounded-xl text-lg border border-white/30" 
            type="search" 
            placeholder="Find a User's Top 100" 
            aria-label="Search"
          />
          <button type='submit' className='w-10 h-10 rounded-2xl text-center bg-[#9e7106] hover:bg-[#ba8300] border border-[#9e7106] transition'>
            <div className='relative left-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
          </button>
        </form>
      )}

      <div className="flex flex-col">
        <h1 className="text-[#9e7106] md:text-6xl text-3xl mt-6 mb-2">
          {getPageTitle()}
        </h1>

        {pageType === 'watched' && (
          <div className='text-xl md:mt-10 text-white'>
            <p>You watched {moviesLength} movies and {seriesLength} series</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 mt-4 mb-4">
            {error}
          </div>
        )}

        <div className="px-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-10">
          {movies.map((movie: Movie, index: number) => (
            <div className="relative bg-[#191919] py-5 px-4 flex flex-col" key={index}>
              {(isUser || pageType !== 'top') && (
                <p onClick={() => deleteItem(index)} className="absolute top-2 left-2 text-white cursor-pointer text-xl font-bold">x</p>
              )}
              <img 
                onClick={() => imageClick(movie.title)} 
                className="w-42 h-72 mx-auto object-cover cursor-pointer" 
                src={movie.poster} 
                alt="poster"
              />
              <h3 className="text-white mt-4 mb-4">{movie.title}</h3>
              <div className="-mb-6 flex justify-between items-center text-[#c7c8c9] gap-2">
                <p className="text-sm">{movie.runtime}</p>
                <p className="text-sm border border-white/40 py-1 px-2">
                  {movie.type[0].toUpperCase() + movie.type.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {loading && <p>Loading...</p>}
    </div>
  );
}