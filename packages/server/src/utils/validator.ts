import { plainToInstance } from "class-transformer";
import { validate as V, ValidatorOptions } from "class-validator";
import HttpException from "../exceptions/HttpException";

export const validate = async (dto: any, data: Record<string, string>, options?: ValidatorOptions) => {
  const obj: any = plainToInstance(dto as any, data);
  const errors = await V(obj, options);
  if (errors.length > 0) {
    const message = "Unprocessable Entity";
    const errorsMap = errors.map((error) => {
      return { [error.property]: Object.values(error.constraints!) };
    });
    throw new HttpException(422, message, errorsMap);
  }

  return obj;
};
