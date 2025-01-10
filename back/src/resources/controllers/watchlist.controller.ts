import { Router, Request, Response, NextFunction } from "express";
import WatchlistService from "../services/watchlist.service";
import Controller from "../../utils/controller.interface";

export default class WatchlistController implements Controller {
  public path = "/watchlist";
  public router = Router();
  private watchlistService = new WatchlistService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/:userId`, this.addToWatchlist);
    this.router.delete(`${this.path}/:userId/:id`, this.removeFromWatchlist);
    this.router.get(`${this.path}/:userId`, this.getUserWatchlist);
  }

  private addToWatchlist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.params.userId;
      const { title, year, runtime, type, poster } = req.body;

      if (!title) {
        return res
          .status(400)
          .json({ error: "Bad Request", message: "Missing required fields" });
      }

      const result = await this.watchlistService.addMovieToWatchlist(userId, {
        title,
        year,
        runtime,
        type,
        poster,
      });

      if (!result.success) {
        return res
          .status(400)
          .json({ error: result.error, message: result.message });
      }

      return res.status(201).json(result.data);
    } catch (error) {
      next(error);
    }
  };

  private removeFromWatchlist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const movieId = req.params.id;
      const result = await this.watchlistService.removeMovieFromWatchlist(
        movieId
      );

      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  private getUserWatchlist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.params.userId;
      const listOfWatched = await this.watchlistService.getWatchlist(userId);

      return res.status(200).json(listOfWatched);
    } catch (error) {
      next(error);
    }
  };
}
