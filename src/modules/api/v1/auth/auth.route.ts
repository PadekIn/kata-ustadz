import { FastifyInstance } from "fastify";
import * as AuthCtrl from "./auth.controller";
import { validateData } from "../../../../middlewares/validation";
import * as Schema from "./auth.validation";
import { ParamsIdRequest } from "./auth.interface";

export default async (app: FastifyInstance): Promise<void> => {
  app.post("/register",  { preHandler: validateData(Schema.register)}, AuthCtrl.register);
  app.get("/verify/:id", AuthCtrl.verify);
  app.post("/login",  { preHandler: validateData(Schema.login)}, AuthCtrl.login);
  app.post("/forgot-password", { preHandler: validateData(Schema.forgotPassword)}, AuthCtrl.forgotPassword);
  app.post<ParamsIdRequest>("/reset-password/:id", { preHandler: validateData(Schema.resetPassword)}, AuthCtrl.resetPassword);
};
