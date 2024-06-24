import { StatusCodes } from "http-status-codes";
import { HttpError, ErrorCodes } from "./root";

export class InternalError extends HttpError {
  constructor(message: string, errorCode: ErrorCodes, error: any) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, errorCode, error);
  }
}
