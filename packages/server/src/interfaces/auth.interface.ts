import AuthConfig from "../configs/auth.config";

export interface DataStoredInToken {
  id: string;
  type: AuthConfig.UserTypes;
}
