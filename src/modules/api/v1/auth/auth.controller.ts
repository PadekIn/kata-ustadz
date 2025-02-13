import * as AuthService from "./auth.service";
import { Request, Response, NextFunction } from "express";
import * as response from "../../../../utils/response";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.register(req.body);

        response.res201("Success register account", account, res);
    } catch (error) {
        next(error);
    }
};

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.verify(req.params.hashId);

        response.res200("Success verify account", account, res);
    } catch (error) {
        next(error);
    }
};

export const loginAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.login(req.body);

        response.res200("Success login", account, res);
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AuthService.forgotPassword(req.body);

        response.res200("Success forgot password", account, res);
    } catch (error) {
        next(error);
    }
};