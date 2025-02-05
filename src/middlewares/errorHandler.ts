import { Request, Response, NextFunction } from "express";

interface ExtendedError extends Error {
  code?: number;
  errors?: { message: string }[];
}

export const errorHandler = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  if (!err) next();

  const statusCode = err.code || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;
  const errors = err.errors || [];

  if (process.env.NODE_ENV === "development" && statusCode === 500) console.log(err);

  res.status(statusCode).json({
      status: false,
      message,
      errors
  });
};

export const resourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error: ExtendedError = new Error("Resource not found");
  error.code = 404;
  next(error);
};