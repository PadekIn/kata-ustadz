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