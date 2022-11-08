import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../configs/user.config";
import config from "../configs/config.base";
import CredentialsDto from "../dtos/credentials.dto";
import HttpException from "../exceptions/HttpException";
import AuthConfig from "../configs/auth.config";

class AuthService {
  private readonly tokenLife: number = 60 * 60 * 24;

  private userServices = AuthConfig.userServices;

  public async login<T extends User>(
    credentials: CredentialsDto,
    type: AuthConfig.UserTypes,
  ): Promise<{ user: T; token: string }> {
    const findUser = await this.userServices[type].findByEmail(credentials.email);

    if (!findUser) throw new HttpException(409, "User not found");

    const isPasswordMatching = await compare(credentials.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(400, "Invalid credential");

    const token = this.createToken(findUser, type);
    return { user: findUser as T, token };
  }

  private createToken(user: User, type: AuthConfig.UserTypes): string {
    const dataStoredInToken = { id: user.id, type };
    const secret: string = config.SECRET_PASSPHRASE;
    const token = sign(dataStoredInToken, secret, {
      expiresIn: this.tokenLife,
    });

    return token;
  }
}

export default AuthService;
