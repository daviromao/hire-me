type ErrorsMap = {
  [key: string]: string[];
};
class HttpException extends Error {
  public status: number;

  public message: string;

  public errors?: ErrorsMap[];

  constructor(status: number, message: string, errors?: ErrorsMap[]) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

export default HttpException;
