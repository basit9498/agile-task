import CustomError, { SerializeError } from "./customError";

class AuthenticationErrorHandler extends CustomError {
  status: number = 401;

  constructor() {
    super("Unauthorized: Token !!!");
  }
  serializerError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export default AuthenticationErrorHandler;
