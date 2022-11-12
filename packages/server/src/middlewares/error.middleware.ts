import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = err.status || 500;
    const message: string = err.message || "Something went wrong";
    const errors = err.errors || undefined;
    res.status(status).json({ message, errors });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
