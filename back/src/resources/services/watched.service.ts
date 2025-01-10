import { Watched } from "../models/Watched";

export default class WatchedService {
  public async addMovieToWatched(
    userId: string,
    movie: Movie
  ): Promise<{
    success: boolean;
    data?: any;
    error?: string;
    message?: string;
  }> {
    try {
      const existingMovie = await Watched.findOne({
        where: { title: movie.title, humanId: userId },
      });

      if (existingMovie) {
        return {
          success: false,
          error: "Bad Request",
          message: "Movie already exists in Watched.",
        };
      }

      const watchedMovie = await Watched.create({
        humanId: userId,
        ...movie,
      });

      return {
        success: true,
        data: {
          watchedMovie,
          humanId: userId,
          message: "Movie added to Watched.",
        },
      };
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }

  public async removeMovieFromWatched(
    movieId: string
  ): Promise<{ success: boolean; status: number; error?: string }> {
    try {
      const movieToDelete = await Watched.findByIdAndDelete(movieId);

      if (!movieToDelete) {
        return { success: false, status: 404, error: "Movie not found" };
      }

      return { success: true, status: 204 };
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }

  public async getWatchedList(userId: string): Promise<any> {
    try {
      const watchedList = await Watched.find({ where: { humanId: userId } });
      return watchedList;
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }
}
