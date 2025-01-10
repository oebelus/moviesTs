import { Watchlist } from "../models/Watchlist";

export default class WatchlistService {
  public async addMovieToWatchlist(
    userId: string,
    movie: Movie
  ): Promise<{
    success: boolean;
    data?: any;
    error?: string;
    message?: string;
  }> {
    try {
      const existingMovie = await Watchlist.findOne({
        where: { title: movie.title, humanId: userId },
      });

      if (existingMovie) {
        return {
          success: false,
          error: "Bad Request",
          message: "Movie already in your watchlist.",
        };
      }

      const watchedMovie = await Watchlist.create({
        humanId: userId,
        ...movie,
      });

      return {
        success: true,
        data: {
          watchedMovie,
          humanId: userId,
          message: "Movie added to watchlist.",
        },
      };
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }

  public async removeMovieFromWatchlist(
    movieId: string
  ): Promise<{ success: boolean; status: number; error?: string }> {
    try {
      const result = await Watchlist.findByIdAndDelete(movieId);

      if (!result) {
        return { success: false, status: 404, error: "Movie not found" };
      }

      return { success: true, status: 204 };
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }

  public async getWatchlist(userId: string): Promise<any> {
    try {
      const listOfWatched = await Watchlist.find({
        humanId: userId,
      });
      return listOfWatched;
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }
}
