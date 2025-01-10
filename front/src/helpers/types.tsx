export default interface Movies {
    _id: number;
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

export default interface MovieOut {
    _id: number;
    title: string;
    year: string;
    runtime: string;
    type: string;
    poster: string;
    released: string;
    imdbRating: string;
    genre: string;
    actors: string;
    writer: string;
    director: string;
    plot: string;
    country: string;
}