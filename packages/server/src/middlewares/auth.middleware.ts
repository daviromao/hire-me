import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/auth.interface";
import HttpException from "../exceptions/HttpException";
import config from "../configs/config.base";
import AuthConfig from "../configs/auth.config";
import errorHandler from "./error.middleware";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new HttpException(401, "Unauthorized");
    const { id, type } = verify(token, config.SECRET_PASSPHRASE) as DataStoredInToken;
    const user = await AuthConfig.userServices[type].findById(id);
    if (!user) throw new HttpException(401, "Unauthorized");

    next(user);
  } catch (error) {
    errorHandler(new HttpException(401, "Unauthorized"), req, res, next);
  }
};
