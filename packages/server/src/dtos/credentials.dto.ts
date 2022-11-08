import { IsEmail, IsString } from "class-validator";

class CredentialDto {
  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
}

export default CredentialDto;
