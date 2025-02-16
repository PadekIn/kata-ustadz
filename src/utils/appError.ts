import { FastifyError } from "fastify";

type Errors = { message: string }[];

export class AppError extends Error implements FastifyError {
  code: string;
  statusCode: number;
  errors?: Errors;

  constructor(statusCode: number, message: string, errors: Errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.code = statusCode.toString();
  }
};

export default (code: number, message: string, errors?: Errors): AppError => {
  return new AppError(code, message, errors);
};
