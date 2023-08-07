import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/errors/customError";

const errorMiddlewareHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    const status: number = error.status || 404;
    return res.status(status).json({ error: error.serializerError() });
  }
  res.status(400).json({ error: { message: error.message } });
};

export default errorMiddlewareHandler;
