import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import err from "../utils/appError";

export function validateData(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const detailError = error.errors.map((issue: any) => ({
            message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        next(err(400, "Invalid Request", detailError));
      } else {
        next(error);
      }
    }
  };
}