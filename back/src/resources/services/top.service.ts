import { Top } from "../models/Top";

export default class TopService {
  public async addMovieToTop(
    userId: string,
    movie: Movie
  ): Promise<{
    success: boolean;
    data?: any;
    error?: string;
    message?: string;
  }> {
    try {
      const existingMovie = await Top.findOne({
        where: { title: movie.title, humanId: userId },
      });

      if (existingMovie) {
        return {
          success: false,
          error: "Bad Request",
          message: "Movie already in your top list.",
        };
      }

      const topMovie = await Top.create({
        humanId: userId,
        ...movie,
      });

      return {
        success: true,
        data: {
          topMovie,
          humanId: userId,
          message: "Movie added to top list.",
        },
      };
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }

  public async removeMovieFromTop(
    movieId: string
  ): Promise<{ success: boolean; status: number; error?: string }> {
    try {
      const movieToDelete = await Top.findByIdAndDelete(movieId);

      if (!movieToDelete) {
        return { success: false, status: 404, error: "Movie not found" };
      }

      return { success: true, status: 204 };
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }

  public async getTopList(userId: string): Promise<any> {
    try {
      const topList = await Top.find({ humanId: userId });
      return topList;
    } catch (error) {
      throw new Error("Internal Server Error: " + (error as Error).message);
    }
  }
}
