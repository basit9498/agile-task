export interface SerializeError {
  message: string;
  field?: string;
}
abstract class CustomError extends Error {
  abstract status: number;
  constructor(message: string) {
    super(message);
  }
  abstract serializerError(): { message: string; field?: string }[];
}

export default CustomError;
