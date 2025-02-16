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
          message: `${issue.message}`,
          field: issue.path.join(".") || "body",
        }));
        throw appError(400, "Bad Request", detailError);

      } else {
        throw appError(400, "Bad Request");
      }
    }
  };
}