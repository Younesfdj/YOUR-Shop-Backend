import { HttpError } from "./root";
import { ErrorCodes } from "./root";
import { StatusCodes } from "http-status-codes";
export class UnprocessedEntityError extends HttpError {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, errorCode);
  }
}
