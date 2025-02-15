import * as ContentService from "./content.service";
import { Request, Response, NextFunction } from "express";
import * as CustomResponse from "../../../../utils/response";

export const getAllContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = {
            page: parseInt(req.query.page as string) || 1,
            limit: parseInt(req.query.limit as string) || 10,
        };

        const contents = await ContentService.getContents(query);

        CustomResponse.res200(res, "Success get all content", contents);
    } catch (error) {
        next(error);
    }
};

export const getBunnyContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contents = await ContentService.getBunnyContents();

        CustomResponse.res200(res, "Success get all content", contents);
    } catch (error) {
        next(error);
    }
};

export const storeContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("hallo");
    } catch (error) {
        next(error);
    }
};