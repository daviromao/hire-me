import { UserType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { User } from "../configs/user.config";
import HttpException from "../exceptions/HttpException";
import errorHandler from "./error.middleware";

export const roleMiddleware = (type: UserType) => {
  return (user: User, req: Request, res: Response, next: NextFunction) => {
    if (user.type !== type) {
      return errorHandler(new HttpException(403, "Forbidden"), req, res, next);
    }

    return next(user);
  };
};
