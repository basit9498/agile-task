import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { RequestValidationError } from "../utils/errors/requestValidationError";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: Result = validationResult(req);
    if (!result.isEmpty()) {
      throw new RequestValidationError(result.array());
    }
    next();
  } catch (error) {
    next(error);
  }
};
