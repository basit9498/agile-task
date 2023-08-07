import CustomError, { SerializeError } from "./customError";

class NotFoundedError extends CustomError {
  status: number;

  constructor(message: string, status: number = 404) {
    super(message);
  }

  serializerError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export default NotFoundedError;
