import { FastifyInstance } from "fastify";
import * as PublicController from "./public.controller";

export default async (app: FastifyInstance) => {
    app.get("/", PublicController.root);
};