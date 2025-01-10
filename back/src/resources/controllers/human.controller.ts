import { NextFunction, Router, Request, Response } from "express";
import HumanService from "../services/human.service";
import Controller from "../../utils/controller.interface";

export default class HumanController implements Controller {
  public path = "/users";
  public router = Router();
  private humanService = new HumanService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}`, this.getUserByUsername);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username, email, password } = req.body;

      const result = await this.humanService.register(
        username,
        email,
        password
      );

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      return res.status(201).json(result.data);
    } catch (error) {
      next(error);
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username, password } = req.body;

      const result = await this.humanService.login(username, password);

      if (!result.success) {
        return res.status(401).json({ error: result.error });
      }

      return res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  };

  private getUserByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username } = req.body;
      const user = await this.humanService.findUser(username);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
