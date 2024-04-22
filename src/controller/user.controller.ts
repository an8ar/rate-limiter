import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import * as bcrypt from "bcrypt";
class UserController {
  private userService = new UserService();

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 5);
      const { id } = await this.userService.createUser(email, hashedPassword);
      req.session.userId = id;
      res.locals.response = {
        message: "User created successfully",
        data: { id, email },
        statusCode: 201,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { id } = await this.userService.loginUser(email, password);
      req.session.userId = id;
      res.locals.response = {
        message: "User logged in successfully",
        data: { email, id },
        statusCode: 201,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.response = {
        message: "User fetched successfully",
        data: { userId: req.user.userId, sessionId: req.user.userId },
        statusCode: 200,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
