import * as AuthCtrl from "./auth.controller";
import { Router } from "express";
import { validateData } from "../../../../middlewares/validation";
import { registerSchema } from "./auth.validation";

export default (router: Router) => {
    const prefix:string = "/auth";
    router.post(prefix + "/register", validateData(registerSchema), AuthCtrl.register);
    router.get(prefix + "/verify/:hashId", AuthCtrl.verifyAccount);
};