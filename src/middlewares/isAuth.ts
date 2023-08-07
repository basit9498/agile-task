import { NextFunction, Request, Response } from "express";
import AuthenticationErrorHandler from "../utils/errors/authenticationErrorHandler";
import { verifyToken } from "../utils/token/verifyToken";
import { JsonWebTokenError } from "jsonwebtoken";
import { JwtData } from "../utils/token/generateToken";

async function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return next(new AuthenticationErrorHandler());
    }

    // const decodeToken: JwtData | JsonWebTokenError = await verifyToken(
    //   bearerToken.split(" ")[1]
    // );

    const decodeToken = (await verifyToken(
      bearerToken.split(" ")[1]
    )) as JwtData;

    // if (decodeToken instanceof JsonWebTokenError) {
    //   return next(new AuthenticationErrorHandler());
    // }

    req.user = {
      id: decodeToken.id,
      name: decodeToken.name,
      email: decodeToken.email,
    };

    return next();
  } catch (error) {
    return next(new AuthenticationErrorHandler());
  }
}

export default isAuth;
