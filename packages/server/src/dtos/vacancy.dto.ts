import { IsString, IsDecimal } from "class-validator";
import { WorkRegime, WorkLoad, WorkType, ExperienceLevel } from "@prisma/client";

class CreateVacancyDto {
  @IsString()
  public title!: string;

  @IsString()
  public description!: string;

  @IsDecimal()
  public salary?: number;

  @IsString()
  public workRegime!: WorkRegime;

  @IsString()
  public workLoad!: WorkLoad;

  @IsString()
  public workType!: WorkType;

  @IsString()
  public experienceLevel!: ExperienceLevel;
}

export default CreateVacancyDto;
