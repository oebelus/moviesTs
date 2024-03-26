import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Movies from '../helpers/types'
import { initialData } from '../helpers/consts'

function Movie() {
    const [movieData, setMovieData] = useState<Movies>(initialData)
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
            <div className="movie">
            <h2 className='movie-page-title'>{movieData!.Title}</h2>
                <div className='movie-container-second'>
                    <div className='movie-card'>
                        <div className="left-container">
                            <div className="left-small">
                                <p data-name='type'>{movieData!.Type? movieData!.Type[0].toUpperCase() + movieData!.Type.slice(1, movieData!.Type.length) : null}</p>
                                <p data-name='year'>{movieData!.Released}</p>
                                <p data-name='runtime'>{movieData!.Runtime}</p>
                            </div>
                            <div className="left-big">
                                <img className='poster-image' src={movieData!.Poster} alt="" />
                                <div className="genres">
                                    {movieData!.Genre ? movieData!.Genre.split(', ').map((genre, key: number) => {
                                        return (
                                            <p className="genre" key={key}>{genre}</p>
                                        )
                                    }): null}
                                </div>
                                    
                            </div>
                        </div>
                        <div className="right-container">
                            <div className='right-small'>
                                {movieData!.imdbRating?
                                <p>IMDb Rating<br/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    {movieData!.imdbRating}/10
                                </p>:null
                                }
                                {/*<p>Your Rating:</p>*/}
                            </div>
                            <div className="right-big">
                                <p><span className='span-title'>Director: </span>{movieData!.Director}<hr/></p>
                                <p><span className='span-title'>Writer: </span>{movieData!.Writer}<hr/></p>
                                <p><span className='span-title'>Actors: </span>{movieData!.Actors}<hr/></p>
                                <p>{movieData!.Plot}<hr/></p>
                                <p><span className='span-title'>Country: </span>{movieData!.Country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Movie