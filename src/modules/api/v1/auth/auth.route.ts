import * as AuthCtrl from "./auth.controller";
import { Router } from "express";
import { validateData } from "../../../../middlewares/validation";
import { registerSchema, loginSchema, forgotPasswordSchema } from "./auth.validation";

export default (router: Router) => {
    const prefix:string = "/auth";
    router.post(prefix + "/register", validateData(registerSchema), AuthCtrl.register);
    router.get(prefix + "/verify/:hashId", AuthCtrl.verifyAccount);
    router.post(prefix + "/login", validateData(loginSchema), AuthCtrl.loginAccount);
    router.post(prefix + "/forgot-password", validateData(forgotPasswordSchema), AuthCtrl.forgotPassword);
};