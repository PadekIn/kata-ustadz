import { Response } from "express";

export const res200 = (res: Response, message: string, data: any = null): void => {
    res.status(200).json({
        status: {
            code: 200,
            message,
        },
        data,
    });
};

export const res201 = (res: Response, message: string, data: any = null): void => {
    res.status(201).json({
        status: {
            code: 201,
            message,
        },
        data,
    });
};