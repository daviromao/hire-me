import { IsEmail, IsString } from "class-validator";

class CreateCandidateDto {
  @IsString()
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
}

export default CreateCandidateDto;
