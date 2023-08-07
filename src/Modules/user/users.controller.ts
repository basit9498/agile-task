import express, { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/core/controller.core";
import UserService from "./users.service";
import isAuth from "../../middlewares/isAuth";
import NotFoundedError from "../../utils/errors/notFoundedErrorHandler";
import * as Validation from "../../utils/validation/user-validation";
import { validationMiddleware } from "../../middlewares/validationMiddlewareHandler";
import {
  JwtData,
  generateResetPasswordToken,
  generateToken,
} from "../../utils/token/generateToken";
import User from "./entities/user.entity";
import { verifyForgetPasswordToken } from "../../utils/token/verifyToken";

class UserController extends Controller {
  path: string = "/user";
  router: Router;
  private service: UserService;

  constructor() {
    super();
    this.router = express.Router();
    this.service = new UserService();
    this.initializeRouter();
    // console.log("this.service:", this.service);
  }

  initializeRouter() {
    /**
     * Auth
     */
    this.router.post(
      "/auth/login",
      Validation.login,
      validationMiddleware,
      this.userLogin
    ); //user login

    this.router.post(
      "/auth/forget-password",
      Validation.forgetPassword,
      validationMiddleware,
      this.userForgetPassword
    ); // user forget password

    this.router.post("/auth/reset-password/:token", this.userResetPassword); //user reset password

    /**
     * User
     */

    this.router.post(
      this.path,
      Validation.register,
      validationMiddleware,
      this.userRegister
    ); // register

    this.router.get(this.path.concat("/"), isAuth, this.getSingleUser);
  }

  /**
   * Methods
   */

  // user login
  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = (await this.service.login(email, password)) as User;
      // token
      const token = generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      const user_data = { id: user.id, name: user.name, email: user.email };

      res.status(200).json({ user: user_data, token });
    } catch (error) {
      if (error instanceof NotFoundedError) {
        res.status(404).json({ error: { message: error.message } });
      } else {
        next(error);
      }
    }
  };

  // forget password
  userForgetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      const user = (await this.service.getMe(email)) as User;
      // token generate
      const token = generateResetPasswordToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });
      // if this is valid then it send to email to that user, but for now i send the token that will in postman
      res.status(200).json({ token: token });
    } catch (error) {
      next(error);
    }
  };

  // reset password
  userResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      if (!token) {
        throw new NotFoundedError("Token is missing !!!");
      }
      // verify token
      const user = (await verifyForgetPasswordToken(token)) as JwtData;
      // reset password
      const userUpdate = await this.service.resetPassword(user.id, password);

      res.status(200).json({ message: "reset password ", userUpdate });
    } catch (error) {
      next(error);
    }
  };

  // User create account
  userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const user = await this.service.register({
        name,
        email,
        password,
        active_status: true,
      });

      res.json({ user: user });
    } catch (error) {
      next(error);
    }
  };

  // user get data,who login
  getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.getMe(req.user.id);
      res.json({ user: user });
    } catch (error) {
      next(error);
    }
  };

  //
}

export default UserController;
