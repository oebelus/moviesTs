import { Router, Request, Response, NextFunction } from "express";
import WatchedService from "../services/watched.service";
import Controller from "../../utils/controller.interface";

export default class WatchedController implements Controller {
  public path = "/watched";
  public router = Router();
  private watchedService = new WatchedService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/:userId`, this.addToWatched);
    this.router.delete(`${this.path}/:userId/:id`, this.removeFromWatched);
    this.router.get(`${this.path}/:userId`, this.getUserWatchedList);
  }

  private addToWatched = async (
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

      const result = await this.watchedService.addMovieToWatched(userId, {
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

  private removeFromWatched = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const movieId = req.params.id;
      const result = await this.watchedService.removeMovieFromWatched(movieId);

      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  private getUserWatchedList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.params.userId;
      const watchedList = await this.watchedService.getWatchedList(userId);
      console.log(watchedList);
      return res.status(200).json(watchedList);
    } catch (error) {
      next(error);
    }
  };
}
