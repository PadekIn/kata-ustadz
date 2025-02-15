import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import env from "../configs/env";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../utils/prismaErrors";
import { AppError } from "../utils/appError";

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  let statusCode = Number(error.statusCode) ?? 500;
  let message = statusCode === 500 ? "Internal Server Error" : error.message;
  let errors: { message: string }[] = [];

  // Map error
  if (error instanceof AppError) {
    statusCode = Number(error.statusCode);
    message = error.message;
    errors = error.errors || [];
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error);
    statusCode = prismaError.code;
    message = prismaError.message;
  }

  // Log error
  if (env.NODE_ENV === "development") {
    request.log.error({
      statusCode,
      message: error.message,
      stack: error.stack,
    }); 
  } else if (env.NODE_ENV === "production") {
    const logMessage = {
      statusCode,
      message: error.message,
    };
    if (statusCode === 500) {
      request.log.error(logMessage);
    } else {
      request.log.warn(logMessage);
    }
  }

  reply.status(statusCode).send({
    status: false,
    message,
    errors,
  });
}

export function notFoundHandler(request: FastifyRequest, reply: FastifyReply) {
  const statusCode = 404;
  const message = "Route not found";

  // Log error hanya jika di development
  if (env.NODE_ENV === "development") {
    request.log.warn({
      statusCode,
      message,
      method: request.method,
      url: request.url,
    });
  }

  reply.status(statusCode).send({
    status: false,
    message,
    errors: [],
  });
}
