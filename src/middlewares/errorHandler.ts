import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import appError, { AppError } from "../utils/appError";
import { handlePrismaError } from "../utils/prismaErrors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) return next();

  let statusCode = 500;
  let message = "Internal server error";
  let errors: { message: string }[] = [];

  if (err instanceof AppError) {
    statusCode = err.code;
    message = err.message;
    errors = err.errors || [];
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    statusCode = prismaError.code;
    message = prismaError.message;
  }

  if (process.env.NODE_ENV === "development" && statusCode === 500) console.error(err);

  res.status(statusCode).json({
    status: false,
    message,
    errors,
  });
};

export const resourceNotFound = (req: Request, res: Response, next: NextFunction) => {
  next(appError(404, "Resource not found"));
};
