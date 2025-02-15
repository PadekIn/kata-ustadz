import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import sensible from "@fastify/sensible";
import env from "./env";
import loggerConfig from "./logger";
import corsConfig from "./cors";
import helmetConfig from "./helmet";
import apiV1 from "../modules/api/v1";
import { errorHandler, notFoundHandler } from "../utils/errorHandler";
import { authenticate } from "../middlewares/auth";

const app: FastifyInstance = fastify({ logger: loggerConfig });

// Register Plugins
app.register(cors, corsConfig);
app.register(helmet, helmetConfig);
app.register(jwt, { secret: env.JWT_SECRET });
app.register(sensible);
app.decorate("authenticate", authenticate);

// Routes
app.register(apiV1, { prefix: "/api/v1" });

// Error Handling
app.setNotFoundHandler(notFoundHandler);
app.setErrorHandler(errorHandler);

export default app;