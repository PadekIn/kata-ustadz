import { FastifyRequest } from "fastify";
import { ZodSchema, ZodError } from "zod";
import appError from "../utils/appError";

export function validateData(schema: ZodSchema<any>) {
  return async (req: FastifyRequest) => {
    try {
      schema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        const detailError = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        if(detailError.length > 1) {
          throw appError(400, "Invalid Request", detailError);
        } else {
          throw appError(400, detailError[0].message);
        }
      } else {
        throw appError(400, "Invalid Request");
      }
    }
  };
}