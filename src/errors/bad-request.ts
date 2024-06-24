import { HttpError } from "./root";
import { ErrorCodes } from "./root";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends HttpError {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, StatusCodes.BAD_REQUEST, errorCode);
  }
}
