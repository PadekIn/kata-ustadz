import { Response, NextFunction } from "express";
import * as response from "../utils/response";

export const handleNotFound = (res: Response): void => {
  response.res404("Resource not found!", res);
};

export const handleOther = (
  err: any,
  res: Response,
  next: NextFunction
): void => {
  if (!err) {
    return next();
  }

  const statusCode: number = err.statusCode || 500;
  res.status(statusCode);

  if (process.env.NODE_ENV === "development" || statusCode === 500) {
    console.log(err.message);
  }

  const message: string = statusCode === 500 ? "Internal Server Error" : err.message;

  res.json({
    status: err.status || false,
    message,
    data: err.data || null,
  });
};
