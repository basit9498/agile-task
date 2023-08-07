import CustomError, { SerializeError } from "./customError";

class ValidationErrorHandler extends CustomError {
  status: number = 400;
  message: string = "Invalid Input data !!!";
  constructor() {
    super("Invalid Input data !!!");
  }
  serializerError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export default ValidationErrorHandler;
