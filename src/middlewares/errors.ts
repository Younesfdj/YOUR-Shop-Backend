import { HttpError } from "../errors/root";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { log } from "../utils/logger";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
import { InternalError } from "../errors/internal-error";
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.error(err);
  if (err instanceof InternalError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
      error: err.error.message,
    });
  }
  if (err instanceof UnprocessedEntityError) {
    return res
      .status(err.statusCode)
      .json({ message: JSON.parse(err.message), errorCode: err.errorCode });
  }
  if (err instanceof HttpError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, errorCode: err.errorCode });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};

export default errorHandler;
