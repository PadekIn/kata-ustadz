import { Response } from "express";

export const res200 = (message: string, data: any, res: Response): void => {
    res.status(200).json({
        status: {
            code: 200,
            message,
        },
        data,
    });
};

export const res201 = (message: string, data: any, res: Response): void => {
    res.status(201).json({
        status: {
            code: 201,
            message,
        },
        data,
    });
};

export const res404 = (message: string, res: Response): void => {
    res.status(404).json({
        status: {
            code: 404,
            message,
        },
        data: null,
    });
};
