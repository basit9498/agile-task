import { FieldValidationError } from "express-validator";
import CustomError, { SerializeError } from "./customError";

export class RequestValidationError extends CustomError {
  status = 400;
  message: string = "Invalid Request Parameter";

  constructor(public validationError: FieldValidationError[]) {
    super("Invalid Request Parameter");
  }
  public serializerError() {
    return this.validationError.map((err) => {
      return { message: err.msg, field: err.path };
    });
  }
}
