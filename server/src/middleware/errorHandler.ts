import { Request, Response, NextFunction } from "express";
import { logger } from "./requestLogger";

interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  const statusCode = err.statusCode ?? 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  if (statusCode === 500) {
    logger.error("Unhandled error", { message: err.message, stack: err.stack });
  }

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
}
