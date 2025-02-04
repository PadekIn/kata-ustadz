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

        CustomResponse.res200("Success get all content", contents, res);
    } catch (error) {
        next(error);
    }
};