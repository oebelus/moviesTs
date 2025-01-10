import { Router, Request, Response, NextFunction } from "express";
import TopService from "../services/top.service";
import Controller from "../../utils/controller.interface";

export default class TopController implements Controller {
  public path = "/top";
  public router = Router();
  private topService = new TopService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/:userId`, this.addToTop);
    this.router.delete(`${this.path}/:userId/:id`, this.removeFromTop);
    this.router.get(`${this.path}/:userId`, this.getUserTopList);
  }

  private addToTop = async (
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

      const result = await this.topService.addMovieToTop(userId, {
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

  private removeFromTop = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const movieId = req.params.id;
      const result = await this.topService.removeMovieFromTop(movieId);

      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  private getUserTopList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.params.userId;
      const topList = await this.topService.getTopList(userId);

      return res.status(200).json(topList);
    } catch (error) {
      next(error);
    }
  };
}
