import { FastifyInstance } from "fastify";
import * as AuthCtrl from "./auth.controller";
import { validateData } from "../../../../middlewares/validation";
import * as Schema from "./auth.validation";
import { ForgotPasswordData, LoginData, ParamsIdRequest, RegisterData } from "./auth.interface";

export default async (app: FastifyInstance): Promise<void> => {
  app.post<{ Body: RegisterData }>(
    "/register",
    { preHandler: validateData(Schema.register) },
    AuthCtrl.register
  );
  app.get(
    "/verify/:id", 
    AuthCtrl.verify
  );
  app.post<{ Body: LoginData }>(
    "/login",
    { preHandler: validateData(Schema.login) },
    AuthCtrl.login
  );
  app.post<{ Body: ForgotPasswordData }>(
    "/forgot-password",
    { preHandler: validateData(Schema.forgotPassword) },
    AuthCtrl.forgotPassword
  );
  app.post<ParamsIdRequest>(
    "/reset-password/:id",
    { preHandler: validateData(Schema.resetPassword) },
    AuthCtrl.resetPassword
  );
};
