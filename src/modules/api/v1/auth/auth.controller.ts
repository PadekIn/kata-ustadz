import * as AuthService from "./auth.service";
import { Request, Response, NextFunction } from "express";
import * as response from "../../../../utils/response";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.register(req.body);

        response.res201(res, "Success register account", account);
    } catch (error) {
        next(error);
    }
};

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.verify(req.params.hashId);

        response.res200(res, "Success verify account", account);
    } catch (error) {
        next(error);
    }
};

export const loginAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.login(req.body);

        response.res200(res, "Success login", account);
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.forgotPassword(req.body);

        response.res200(res, "Success forgot password", account);
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.resetPassword(req.params.hashId, req.body);

        response.res200(res, "Success reset password", account);
    } catch (error) {
        next(error);
    }
};