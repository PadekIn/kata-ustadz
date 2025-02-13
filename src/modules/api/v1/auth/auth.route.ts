import * as AuthCtrl from "./auth.controller";
import { Router } from "express";
import { validateData } from "../../../../middlewares/validation";
import * as Schema from "./auth.validation";

export default (router: Router) => {
    const prefix:string = "/auth";
    router.post(prefix + "/register", validateData(Schema.register), AuthCtrl.register);
    router.get(prefix + "/verify/:hashId", AuthCtrl.verifyAccount);
    router.post(prefix + "/login", validateData(Schema.login), AuthCtrl.loginAccount);
    router.post(prefix + "/forgot-password", validateData(Schema.forgotPassword), AuthCtrl.forgotPassword);
    router.post(prefix + "/reset-password/:hashId", validateData(Schema.resetPassword), AuthCtrl.resetPassword);
};