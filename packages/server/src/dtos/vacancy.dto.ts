import { IsString, IsDecimal, IsOptional, IsIn } from "class-validator";
import { WorkRegime, WorkLoad, WorkType, ExperienceLevel } from "@prisma/client";

class CreateVacancyDto {
  @IsString()
  public title!: string;

  @IsString()
  public description!: string;

  @IsDecimal()
  @IsOptional()
  public salary?: number;

  @IsString()
  @IsIn(Object.values(WorkRegime))
  public workRegime!: WorkRegime;

  @IsString()
  @IsIn(Object.values(WorkLoad))
  public workLoad!: WorkLoad;

  @IsString()
  @IsIn(Object.values(WorkType))
  public workType!: WorkType;

  @IsString()
  @IsIn(Object.values(ExperienceLevel))
  public experienceLevel!: ExperienceLevel;
}

export default CreateVacancyDto;
