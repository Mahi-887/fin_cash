import morgan from "morgan";
import winston from "winston";
import { Request, Response } from "express";

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    process.env.NODE_ENV === "production"
      ? winston.format.json()
      : winston.format.prettyPrint()
  ),
  transports: [new winston.transports.Console()],
});

export const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
    skip: (_req: Request, res: Response) =>
      process.env.NODE_ENV === "production" && res.statusCode < 400,
  }
);
