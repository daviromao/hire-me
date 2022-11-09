import { NextFunction, Request, Response } from "express";
import type AuthConfig from "../configs/auth.config";
import CredentialDto from "../dtos/credentials.dto";
import AuthService from "../services/auth.service";

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const credentials = req.body as CredentialDto;
      const userType = req.params.type as AuthConfig.UserTypes;
      const { user, token } = await this.authService.login(credentials, userType);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
